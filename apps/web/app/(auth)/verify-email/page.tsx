"use client";

import { AuthWrapper, EmailVerification } from "@/components/auth";

export default function VerifyEmailPage() {
  return (
    <AuthWrapper>
      <EmailVerification />
    </AuthWrapper>
  );
}
