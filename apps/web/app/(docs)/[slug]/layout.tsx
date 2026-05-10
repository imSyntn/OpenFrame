import { Header, OnThisPage } from "@/components/common";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="min-h-screen flex items-start">
        <main className="flex-1 w-full max-w-3xl mx-auto px-6 py-12 md:py-20">
          <article className="prose prose-zinc dark:prose-invert prose-headings:font-semibold prose-a:text-primary prose-a:no-underline hover:prose-a:underline max-w-none">
            {children}
          </article>
        </main>
        <aside className="hidden xl:block w-56 shrink-0 sticky top-0 self-start py-12 md:py-20 max-h-screen overflow-auto">
          <OnThisPage />
        </aside>
      </div>
    </>
  );
}
