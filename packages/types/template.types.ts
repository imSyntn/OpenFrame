interface BaseTemplateGenerateType {
  to: string;
  subject: string;
  name: string;
}

export interface OTPTemplateGenerateType extends BaseTemplateGenerateType {
  otp: string;
  duration: string;
}

export interface WelcomeTemplateGenerateType extends BaseTemplateGenerateType {
  dashboardUrl: string;
}

export interface EmailVerificationTemplateGenerateType extends BaseTemplateGenerateType {
  verificationUrl: string;
  duration: string;
}

export interface ReportSubmitTemplateGenerateType extends BaseTemplateGenerateType {
  reportId: string;
  contentTitle: string;
  reportReason: string;
  reportUrl: string;
}

export interface ReportUpdatedTemplateGenerateType extends BaseTemplateGenerateType {
  reportId: string;
  contentTitle: string;
  status: string;
  note: string;
  reportUrl: string;
}

export type EmailTemplateGenerateType =
  | {
      type: "otp";
      data: OTPTemplateGenerateType;
    }
  | {
      type: "welcome";
      data: WelcomeTemplateGenerateType;
    }
  | {
      type: "email-verification";
      data: EmailVerificationTemplateGenerateType;
    }
  | {
      type: "report-submit";
      data: ReportSubmitTemplateGenerateType;
    }
  | {
      type: "report-updated";
      data: ReportUpdatedTemplateGenerateType;
    };
