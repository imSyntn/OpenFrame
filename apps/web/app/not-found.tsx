import { Error404Svg, Header } from "@/components/common";

export default function NotFoundPage() {
  return (
    <>
      <Header />
      <div className="flex h-[calc(100dvh-72px)] w-full flex-col items-center justify-center px-4 md:px-6">
        <Error404Svg className="h-auto w-full max-w-xl" />
      </div>
    </>
  );
}
