"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SearchResults } from "./SearchResult";
import { SearchBar } from "../common";
import { toast } from "sonner";

export function SearchField({ query }: { query?: string | null }) {
  const [searchText, setSearchText] = useState(query || "");
  const router = useRouter();

  const handleSearch = () => {
    if (searchText.length < 3) {
      toast.error("Search query must be at least 3 characters long");
      return;
    }
    router.push(`/search?q=${searchText}`);
  };

  return (
    <div className="relative w-full flex justify-center">
      <SearchBar
        value={searchText}
        onChange={setSearchText}
        onClick={handleSearch}
      />
      {searchText.length > 0 && <SearchResults query={searchText} />}
    </div>
  );
}
