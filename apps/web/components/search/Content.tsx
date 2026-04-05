import { useSearch } from "@/hooks";
import { ScrollArea, ScrollBar } from "@workspace/ui/components/scroll-area";
import { TagCard, TagCardSkeleton } from "./TagCard";
import { UserCard, UserCardSkeleton } from "./UserCard";
import { PictureCard, PictureCardSkeleton } from "./PictureCard";

function Container({ children }: { children: React.ReactNode }) {
  return <div className="min-h-[30vh] w-full px-10 mb-10">{children}</div>;
}

function ResultWrapper({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <h2 className="text-lg font-semibold my-3 text-primary text-center">
        {title}
      </h2>
      {children}
    </>
  );
}

function HorizontalScrollWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ScrollArea className="w-full">
      <div className="w-max flex gap-4 mb-4">{children}</div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

export function Content({ query }: { query: string }) {
  const { data: result, isLoading, error, isError } = useSearch(query);

  if (query.length < 3) {
    return (
      <Container>
        <p className="text-center text-muted-foreground">
          Enter more than 3 chars
        </p>
      </Container>
    );
  }

  if (isLoading) {
    return (
      <Container>
        <ResultWrapper title="Tags">
          <HorizontalScrollWrapper>
            {Array.from({ length: 20 }).map((_, i) => (
              <TagCardSkeleton key={i} />
            ))}
          </HorizontalScrollWrapper>
        </ResultWrapper>
        <ResultWrapper title="Users">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(128px,1fr))] gap-4">
            {Array.from({ length: 13 }).map((_, i) => (
              <UserCardSkeleton key={i} />
            ))}
          </div>
        </ResultWrapper>
        <ResultWrapper title="Pictures">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(256px,1fr))] gap-4">
            {Array.from({ length: 20 }).map((_, i) => (
              <PictureCardSkeleton key={i} />
            ))}
          </div>
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
      {tags.length > 0 && (
        <ResultWrapper title="Tags">
          {tags.map((tag) => (
            <TagCard key={tag.id} tag={tag} className="min-w-24 h-8" />
          ))}
        </ResultWrapper>
      )}

      {users.length > 0 && (
        <ResultWrapper title="Users">
          <div className="flex flex-wrap gap-4">
            {users.slice(0, 3).map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        </ResultWrapper>
      )}
      {pictures.length > 0 && (
        <ResultWrapper title="Pictures">
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
            {pictures.map((pic) => (
              <PictureCard
                key={pic.id}
                pic={pic}
                className="break-inside-avoid mb-4"
              />
            ))}
          </div>
        </ResultWrapper>
      )}
    </Container>
  );
}
