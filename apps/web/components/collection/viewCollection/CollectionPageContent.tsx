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
import { useGlobalStateStore, useUserStore } from "@/store";

export const CollectionPageContent = ({
  collectionId,
}: {
  collectionId: string;
}) => {
  const {
    data: collection,
    isLoading,
    error,
    isError,
  } = useGetCollectionById(collectionId);
  const loggedInUserId = useUserStore((state) => state.id);
  //   const setOpenCollectionModal = useGlobalStateStore(
  //     (state) => state.setOpenCollectionModal,
  //   );

  if (isLoading) {
    return (
      <>
        <CollectionHeader>
          <HeaderLeft>
            <>
              <HeaderTitle isLoading={isLoading} />
              <HeaderDescription isLoading={isLoading} />
            </>
          </HeaderLeft>
          <HeaderRight isLoading={isLoading} />
        </CollectionHeader>
        <ContentBody>
          <CollectionCardWrapper isLoading={isLoading} />
        </ContentBody>
      </>
    );
  }

  if (!isLoading && isError) return <div>Error: {error.message}</div>;

  if (!collection?.data) return <div>Collection not found</div>;

  const collectionData = collection.data;
  const isOwner = collectionData.creator_id === loggedInUserId;

  return (
    <>
      <CollectionHeader>
        <HeaderLeft>
          <>
            <HeaderTitle collection={collectionData} />

            {collectionData?.description && (
              <HeaderDescription collection={collectionData} />
            )}
          </>
        </HeaderLeft>

        <HeaderRight collection={collectionData} isOwner={isOwner} />
      </CollectionHeader>

      <ContentBody>
        <>
          {collectionData.items.length > 0 && (
            <CollectionCardWrapper>
              <>
                {collectionData.items.map((item) => (
                  <CollectionImageCard
                    key={item.pic_id}
                    item={item}
                    isOwner={isOwner}
                  />
                ))}
              </>
            </CollectionCardWrapper>
          )}
          {collectionData.items.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              No items in this collection yet.
            </div>
          )}
        </>
      </ContentBody>
    </>
  );
};
