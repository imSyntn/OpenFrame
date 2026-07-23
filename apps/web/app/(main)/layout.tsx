import { Header } from "@/components/common";
import { Feature } from "@/components/common/notice";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <Feature />
      {children}
    </>
  );
}
