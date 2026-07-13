import Image from "next/image";

export default function Loading() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background">
      <Image
        src="https://open-frame.t3.tigrisfiles.io/static/miATtgM1gp7Vs67bl95mC_thumbnail.jpg"
        alt="Thumbnail 1"
        width={80}
        height={96}
        priority
        unoptimized
        className="absolute left-[18%] top-[28%] h-24 w-20 -rotate-12 rounded-2xl bg-secondary/20 object-cover object-center shadow-2xl backdrop-blur-md animate-float"
      />

      <Image
        src="https://open-frame.t3.tigrisfiles.io/static/GUqM2H3nRxOaUtKl4PLOM_small.jpg"
        alt="Thumbnail 2"
        width={96}
        height={112}
        priority
        unoptimized
        className="absolute right-[18%] top-[24%] h-28 w-24 rotate-[10deg] rounded-2xl bg-secondary/20 object-cover object-center shadow-2xl backdrop-blur-md animate-float-delay"
      />

      <Image
        src="https://open-frame.t3.tigrisfiles.io/static/foZ69HBv4KculCMEQEOPi_thumbnail.jpg"
        alt="Thumbnail 3"
        width={80}
        height={96}
        priority
        unoptimized
        className="absolute bottom-[24%] right-[20%] h-24 w-20 rotate-[14deg] rounded-2xl bg-secondary/20 object-cover object-center shadow-2xl backdrop-blur-md animate-float-slow"
      />

      <Image
        src="https://open-frame.t3.tigrisfiles.io/static/AFpoFNwLGRIhzcKMA9JHo_thumbnail.jpg"
        alt="Thumbnail 4"
        width={96}
        height={112}
        priority
        unoptimized
        className="absolute bottom-[22%] left-[22%] h-28 w-24 -rotate-[8deg] rounded-2xl bg-secondary/20 object-cover object-center shadow-2xl backdrop-blur-md animate-float"
      />

      <div className="relative flex flex-col items-center gap-8">
        <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-border bg-secondary/20 backdrop-blur-xl">
          <div className="absolute inset-0 rounded-full border border-foreground/20 animate-ping" />
          <div className="absolute inset-[-12px] rounded-full border border-foreground/10 animate-pulse" />

          <div className="h-10 w-10 rounded-full bg-foreground shadow-[0_0_40px_hsl(var(--foreground)/0.8)]" />
        </div>

        <h1 className="text-3xl font-semibold tracking-[0.35em] text-foreground">
          LOADING
        </h1>

        <div className="relative w-64 overflow-hidden rounded-full border border-border bg-secondary/30 p-[2px]">
          <div className="h-1 animate-progress rounded-full bg-foreground" />

          <div className="absolute inset-0 rounded-full shadow-[0_0_30px_hsl(var(--foreground)/0.2)]" />
        </div>
      </div>
    </div>
  );
}
