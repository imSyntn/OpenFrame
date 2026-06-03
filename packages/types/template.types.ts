export interface OTPTemplateGenerateType {
  name: string;
  otp: string;
  duration: string;
}

export interface WelcomeTemplateGenerateType {
  name: string;
  dashboardUrl: string;
}

export interface EmailVerificationTemplateGenerateType {
  name: string;
  verificationUrl: string;
  duration: string;
}

export interface ReportSubmitTemplateGenerateType {
  name: string;
  reportId: string;
  contentTitle: string;
  reportReason: string;
  reportUrl: string;
}

export interface ReportUpdatedTemplateGenerateType {
  reportId: string;
  contentTitle: string;
  status: string;
  note: string;
  reportUrl: string;
}

export interface EmailTemplateGenerateType {
  type:
    | "otp"
    | "welcome"
    | "email-verification"
    | "report-submit"
    | "report-updated";
  data:
    | OTPTemplateGenerateType
    | WelcomeTemplateGenerateType
    | EmailVerificationTemplateGenerateType
    | ReportSubmitTemplateGenerateType
    | ReportUpdatedTemplateGenerateType;
}
