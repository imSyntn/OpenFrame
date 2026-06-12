"use client";

import { AuthWrapper, LoginForm } from "@/components/auth";

export default async function LoginPage() {
  return (
    <AuthWrapper>
      <LoginForm />
    </AuthWrapper>
  );
}
