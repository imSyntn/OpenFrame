export interface OTPTemplateGenerateType {
  name: string;
  otp: string;
  duration: string;
}

export interface WelcomeTemplateGenerateType {
  name: string;
  dashboardUrl: string;
}

export interface EmailTemplateGenerateType {
  type: "otp" | "welcome";
  data: OTPTemplateGenerateType | WelcomeTemplateGenerateType;
}
