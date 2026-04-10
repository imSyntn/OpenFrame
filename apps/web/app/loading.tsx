"use client";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <div className="h-20 w-20 rounded-full bg-primary/30 blur-2xl animate-pulse" />
    </div>
  );
}
