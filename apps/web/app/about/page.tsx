import { BuiltBy, Features, HeroSection, Philosophy, Sponsor } from "@/components/about";

export default function AboutPage() {
  return (
    <div className="min-h-screen pb-32">
      <HeroSection />
      <Philosophy />
      <Features />
      <Sponsor />
      <BuiltBy />
    </div>
  );
}
