import { Header, OnThisPage } from "@/components/common";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="min-h-screen max-w-7xl mx-auto px-6 py-12 md:py-20 flex items-start justify-between gap-12">
        <main className="flex-1 min-w-0 max-w-3xl">
          <article className="prose prose-zinc dark:prose-invert prose-headings:font-semibold prose-a:text-primary prose-a:no-underline hover:prose-a:underline max-w-none">
            {children}
          </article>
        </main>
        <aside className="hidden lg:block w-56 shrink-0 sticky top-24 self-start">
          <OnThisPage />
        </aside>
      </div>
    </>
  );
}
