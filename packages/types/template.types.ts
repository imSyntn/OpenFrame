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

export interface EmailTemplateGenerateType {
  type: "otp" | "welcome" | "email-verification";
  data:
    | OTPTemplateGenerateType
    | WelcomeTemplateGenerateType
    | EmailVerificationTemplateGenerateType;
}
