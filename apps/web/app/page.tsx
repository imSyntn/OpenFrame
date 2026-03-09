"use client";
import { Button } from "@workspace/ui/components/button";
import { useUserStore } from "@/store";
import Link from "next/link";

export default function Page() {
  const state = useUserStore((state) => state);
  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Hello World</h1>
        <div className="flex gap-2">
          <Button>Button</Button>
          <Button
            variant="outline"
            onClick={() => {
              console.log(state);
            }}
          >
            Outline
          </Button>
          <Link href="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}
