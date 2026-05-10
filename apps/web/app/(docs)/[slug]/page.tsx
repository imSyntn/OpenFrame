import { notFound } from "next/navigation";

const VALID_SLUGS = [
  "privacy-policy",
  "cookie-policy",
  "terms-of-service",
  "copyright-policy",
  "faq",
  "api",
  "roadmap",
] as const;

type ValidSlug = (typeof VALID_SLUGS)[number];

function isValidSlug(slug: string): slug is ValidSlug {
  return VALID_SLUGS.includes(slug as ValidSlug);
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isValidSlug(slug)) notFound();

  const { default: MDXContent } = await import(`@/markdown/${slug}.mdx`);

  return <MDXContent />;
}

export function generateStaticParams() {
  return VALID_SLUGS.map((slug) => ({ slug }));
}
