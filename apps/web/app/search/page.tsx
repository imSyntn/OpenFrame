"use client";

import { Content, HeroSection } from "@/components/search";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchPage() {
  const params = useSearchParams();
  const query = params.get("q");
  const [searchText, setSearchText] = useState(query || "");

  return (
    <>
      <HeroSection searchText={searchText} setSearchText={setSearchText} />
      <Content query={searchText} />
    </>
  );
}
