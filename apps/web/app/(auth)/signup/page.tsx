import { AuthWrapper, SignupForm } from "@/components/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | OpenFrame",
  description: "Create your OpenFrame account and start building.",
};

export default function SignupPage() {
  return (
    <AuthWrapper>
      <SignupForm />
    </AuthWrapper>
  );
}
