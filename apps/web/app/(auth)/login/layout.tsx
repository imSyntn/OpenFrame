import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your OpenFrame account and start building.",
};

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
