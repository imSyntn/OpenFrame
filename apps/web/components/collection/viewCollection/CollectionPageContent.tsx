"use client";

import { useGetCollectionById } from "@/hooks";
import React from "react";
import {
  CollectionCardWrapper,
  CollectionHeader,
  ContentBody,
  HeaderDescription,
  HeaderLeft,
  HeaderRight,
  HeaderTitle,
} from "./ContentWrapperComponents";
import { CollectionImageCard } from "../CollectionImageCard";
import { useUserStore } from "@/store";
import { NotFound } from "@/components/common";
import { FileX } from "lucide-react";

export const CollectionPageContent = ({
  collectionId,
}: {
  collectionId: string;
}) => {
  const {
    data: collectionData,
    isFetching,
    error,
    isError,
  } = useGetCollectionById(collectionId);
  const loggedInUserId = useUserStore((state) => state.id);

  if (isFetching) {
    return (
      <>
        <CollectionHeader className="mb-4">
          <HeaderLeft>
            <>
              <HeaderTitle isLoading={isFetching} />
              <HeaderDescription isLoading={isFetching} />
            </>
          </HeaderLeft>
          <HeaderRight isLoading={isFetching} />
        </CollectionHeader>
        <ContentBody>
          <CollectionCardWrapper isLoading={isFetching} />
        </ContentBody>
      </>
    );
  }

  if (isError)
    return (
      <NotFound
        Icon={FileX}
        title={(error as any)?.response?.data?.message || "Unknown error"}
        description="The collection you're looking for doesn't exist or the link may be incorrect."
      />
    );

  const collection = collectionData?.data;

  if (!collection) return <div>Collection not found</div>;

  const isOwner = collection.creator_id === loggedInUserId;

  return (
    <>
      <CollectionHeader className="mb-4 pr-0">
        <HeaderLeft>
          <>
            <HeaderTitle collection={collection} isLoading={isFetching} />

            {collection?.description && (
              <HeaderDescription
                collection={collection}
                isLoading={isFetching}
              />
            )}
          </>
        </HeaderLeft>

        <HeaderRight collection={collection} showUpdationButton={false} />
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
};
