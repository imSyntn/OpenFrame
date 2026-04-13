import {
  PictureCard,
  PictureCardMore,
  PictureCardSkeleton,
  TagCard,
  TagCardMore,
  TagCardSkeleton,
  UserCard,
  UserCardMore,
  UserCardSkeleton,
} from "../search";
import { useSearch } from "@/hooks";

function ResultWrapper({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-3 text-background">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {children}
      </div>
    </div>
  );
}

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute top-full left-0 right-0 w-full max-w-xl mx-auto mt-4 space-y-6 bg-foreground z-50 rounded-xl p-4">
      {children}
    </div>
  );
}

export function SearchResults({ query }: { query: string }) {
  const { data: result, isLoading, error, isError } = useSearch(query);

  if (query.length < 3) {
    return (
      <Container>
        <p className="text-center text-muted-foreground">Type more to search</p>
      </Container>
    );
  }

  if (isLoading) {
    return (
      <Container>
        <ResultWrapper title="Pictures">
          <PictureCardSkeleton />
          <PictureCardSkeleton />
          <PictureCardSkeleton />
          <PictureCardSkeleton />
        </ResultWrapper>
        <ResultWrapper title="Users">
          <UserCardSkeleton />
          <UserCardSkeleton />
          <UserCardSkeleton />
          <UserCardSkeleton />
        </ResultWrapper>
        <ResultWrapper title="Tags">
          <TagCardSkeleton />
          <TagCardSkeleton />
          <TagCardSkeleton />
          <TagCardSkeleton />
        </ResultWrapper>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container>
        <p className="text-center text-destructive">
          {(error as any)?.response?.data?.message || "Error fetching results"}
        </p>
      </Container>
    );
  }

  const { pictures = [], users = [], tags = [] } = result?.data || {};

  if (
    !isLoading &&
    pictures.length === 0 &&
    users.length === 0 &&
    tags.length === 0
  ) {
    return (
      <Container>
        <p className="text-center text-muted-foreground">No results found</p>
      </Container>
    );
  }

  return (
    <Container>
      {pictures.length > 0 && (
        <ResultWrapper title="Pictures">
          {pictures.slice(0, 3).map((pic) => (
            <PictureCard key={pic.id} pic={pic} />
          ))}
          <PictureCardMore query={query} />
        </ResultWrapper>
      )}

      {users.length > 0 && (
        <ResultWrapper title="Users">
          {users.slice(0, 3).map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
          <UserCardMore query={query} />
        </ResultWrapper>
      )}

      {tags.length > 0 && (
        <ResultWrapper title="Tags">
          {tags.slice(0, 3).map((tag) => (
            <TagCard key={tag.id} tag={tag} className="w-full" />
          ))}
          <TagCardMore query={query} />
        </ResultWrapper>
      )}
    </Container>
  );
}
