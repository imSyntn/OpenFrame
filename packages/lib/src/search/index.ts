import { Search } from "@upstash/search";

export const client = new Search({
  url: process.env.UPSTASH_SEARCH_REST_URL!,
  token: process.env.UPSTASH_SEARCH_REST_TOKEN!,
});

type SearchIndex = ReturnType<typeof client.index>;

export const picturesIndex: SearchIndex = client.index("pictures");
export const usersIndex: SearchIndex = client.index("users");
export const tagsIndex: SearchIndex = client.index("tags");
