"use client";

import { AuthWrapper, SignupForm } from "@/components/auth";
import { Metadata } from "next";

export default function SignupPage() {
  return (
    <AuthWrapper>
      <SignupForm />
    </AuthWrapper>
  );
}
