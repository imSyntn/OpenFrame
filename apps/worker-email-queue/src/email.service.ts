import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import type {
  EmailTemplateGenerateType,
  EmailVerificationTemplateGenerateType,
  OTPTemplateGenerateType,
  ReportSubmitTemplateGenerateType,
  ReportUpdatedTemplateGenerateType,
  WelcomeTemplateGenerateType,
} from "@workspace/types";
import { logger } from "@workspace/lib";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const generateEmailTemplate = (payload: EmailTemplateGenerateType) => {
  const template = fs.readFileSync(
    path.join(
      process.cwd(),
      "src",
      "template",
      `${payload.type}.template.html`,
    ),
    "utf-8",
  );

  switch (payload.type) {
    case "otp": {
      const data = payload.data as OTPTemplateGenerateType;
      return template
        .replace("{{NAME}}", data.name)
        .replace("{{OTP}}", data.otp)
        .replace("{{DURATION}}", data.duration);
    }
    case "email-verification": {
      const data = payload.data as EmailVerificationTemplateGenerateType;
      return template
        .replace("{{NAME}}", data.name)
        .replace("{{VERIFICATION_URL}}", data.verificationUrl)
        .replace("{{DURATION}}", data.duration);
    }
    case "report-submit": {
      const data = payload.data as ReportSubmitTemplateGenerateType;
      return template
        .replace("{{NAME}}", data.name)
        .replace("{{REPORT_ID}}", data.reportId)
        .replace("{{CONTENT_TITLE}}", data.contentTitle)
        .replace("{{REPORT_REASON}}", data.reportReason)
        .replace("{{REPORT_URL}}", data.reportUrl);
    }
    case "report-updated": {
      const data = payload.data as ReportUpdatedTemplateGenerateType;
      return template
        .replace("{{REPORT_ID}}", data.reportId)
        .replace("{{CONTENT_TITLE}}", data.contentTitle)
        .replace("{{STATUS}}", data.status)
        .replace("{{MODERATOR_NOTE}}", data.note)
        .replace("{{REPORT_URL}}", data.reportUrl);
    }
    case "welcome": {
      const data = payload.data as WelcomeTemplateGenerateType;
      return template
        .replace("{{NAME}}", data.name)
        .replace("{{DASHBOARD_URL}}", data.dashboardUrl);
    }
    default:
      return "";
  }
};

const sendEmail = async (to: string, subject: string, html: string) => {
  const info = await transporter.sendMail({
    from: '"OpenFrame" <OpenFrame@sayantan.online>',
    to,
    subject,
    html,
  });

  return !!info.messageId;
};

export const sendEmailWithRetry = async (
  to: string,
  subject: string,
  template: string,
  maxRetries = 3,
) => {
  let lastError: unknown;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const info = await sendEmail(to, subject, template);

      if (info) {
        return info;
      }

      throw new Error("Email provider returned no info");
    } catch (error) {
      lastError = error;

      logger.warn("Email send failed", {
        to,
        subject,
        attempt,
        maxRetries,
      });

      if (attempt < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
      }
    }
  }

  throw lastError;
};
