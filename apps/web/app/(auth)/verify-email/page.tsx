import { AuthWrapper, EmailVerification } from "@/components/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Email",
  description: "Verify your email address to continue.",
};

export default function VerifyEmailPage() {
  return (
    <AuthWrapper>
      <EmailVerification />
    </AuthWrapper>
  );
}
