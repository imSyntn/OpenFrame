import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("refresh_token");

  const headerList = await headers();
  const pathname = headerList.get("x-pathname") || "";

  const isVerifyEmail = pathname.includes("verify-email");

  if (token && !isVerifyEmail) {
    redirect("/");
  }

  return <>{children}</>;
}
