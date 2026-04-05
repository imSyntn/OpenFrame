import { search } from "@/lib/apis";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "./useDebounce";

export const useSearch = (q: string, type?: string) => {
  const debouncedQuery = useDebounce(q, 300);
  return useQuery({
    queryKey: ["search", debouncedQuery, type],
    queryFn: ({ signal }) => search(debouncedQuery, type, signal),
    enabled: !!debouncedQuery && debouncedQuery.length > 2,
  });
};
