import "@workspace/lib/env";
import { kafka } from "@workspace/lib/kafka";
import { logger } from "@workspace/lib/logger";
import type { EmailTemplateGenerateType } from "@workspace/types";
import { generateEmailTemplate, sendEmailWithRetry } from "./email.service";

const consumer = kafka.consumer({ groupId: "worker-email-queue" });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({
    topic: "email-queue",
  });

  await consumer.run({
    eachMessage: async ({ message, topic, partition }) => {
      let emailPayload: EmailTemplateGenerateType;
      try {
        emailPayload = JSON.parse(message.value?.toString() || "{}");
      } catch (error) {
        logger.error("Invalid JSON", {
          topic,
          partition,
          value: message.value?.toString(),
        });
        return;
      }

      const template = generateEmailTemplate(emailPayload);
      if (!template) {
        logger.error("No template generated", emailPayload);
        return;
      }

      const { to, subject } = emailPayload.data;

      try {
        await sendEmailWithRetry(to, subject, template);
      } catch (error) {
        logger.error("Error sending email:", error, emailPayload);
      }
    },
  });
};

run().catch((err) => {
  logger.error("Crashed", err);
  process.exit(1);
});
