import { Kafka } from "kafkajs";
import fs from "fs";
import path from "path";

export const kafka = new Kafka({
  clientId: "openframe",
  brokers: [process.env.KAFKA_BROKER!],
  ssl: {
    rejectUnauthorized: true,
    ca: [
      fs.readFileSync(path.join(process.cwd(), "./src/certs/ca.pem"), "utf8"),
    ],
    cert: fs.readFileSync(
      path.join(process.cwd(), "./src/certs/service.cert"),
      "utf8",
    ),
    key: fs.readFileSync(
      path.join(process.cwd(), "./src/certs/service.key"),
      "utf8",
    ),
  },
});

const producer = kafka.producer();

export const kafkaProduceMessage = async (topic: string, message: string) => {
  await producer.connect();

  await producer.send({
    topic,
    messages: [{ value: message }],
  });

  await producer.disconnect();
};
