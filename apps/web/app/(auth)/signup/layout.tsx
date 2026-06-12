import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create your OpenFrame account and start building.",
};

export default async function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
