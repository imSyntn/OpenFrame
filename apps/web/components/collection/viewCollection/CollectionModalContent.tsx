import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import React from "react";
import { CollectionImageCard } from "../CollectionImageCard";
import { useGlobalStateStore, useUserStore } from "@/store";
import {
  CollectionCardWrapper,
  CollectionHeader,
  ContentBody,
  HeaderDescription,
  HeaderLeft,
  HeaderRight,
  HeaderTitle,
} from "./ContentWrapperComponents";

export function CollectionModalContent() {
  const collection = useGlobalStateStore((state) => state.openCollectionModal);
  const loggedInUserId = useUserStore((state) => state.id);

  if (!collection) return null;
  const isOwner = collection.creator_id === loggedInUserId;

  return (
    <>
      <CollectionHeader as={DialogHeader}>
        <HeaderLeft>
          <>
            <HeaderTitle as={DialogTitle} collection={collection} />

            {collection.description && (
              <HeaderDescription
                as={DialogDescription}
                collection={collection}
              />
            )}
          </>
        </HeaderLeft>

        <HeaderRight collection={collection} isOwner={isOwner} />
      </CollectionHeader>

      <ContentBody>
        <>
          {collection.items.length > 0 && (
            <CollectionCardWrapper>
              <>
                {collection.items.map((item) => (
                  <CollectionImageCard
                    key={item.pic_id}
                    item={item}
                    isOwner={isOwner}
                  />
                ))}
              </>
            </CollectionCardWrapper>
          )}
          {collection.items.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              No items in this collection yet.
            </div>
          )}
        </>
      </ContentBody>
    </>
  );
}
