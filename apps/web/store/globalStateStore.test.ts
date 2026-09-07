import { describe, it, expect } from "vitest";
import { useGlobalStateStore } from "./globalStateStore";
import type { PictureType } from "@/@types";
import { Licenses } from "@workspace/constants";
import { Collection, Resolution } from "@workspace/types";

const mockPicture: PictureType = {
  id: "pic_01J8ZK7Y4Q9F2M6N8X3A5B7C",
  title: "Sunset Over the Mountains",
  alt: "Golden sunset behind snow-covered mountains and a calm lake",
  description:
    "A beautiful golden sunset illuminating a mountain range with reflections visible on the calm lake below.",
  created_at: "2026-09-04T12:15:30.000Z",
  license: Licenses.CC0_1_0,
  user: {
    id: "user_01J8ZK1H9P3Q7R5S2T4U6V8W",
    name: "Alex Morgan",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  src: [
    {
      resolution: "THUMBNAIL",
      url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=400",
      type: "JPG",
      width: 400,
      height: 267,
      size: 45_000,
    },
  ],

  metadata: {
    blurhash: "LKO2?U%2Tw=w]~RBVZRi};RPxuwH",
    dominant_color: "#7A6755",
    palette: ["#7A6755", "#C49A6C", "#E6C9A8", "#4A5D4E", "#1F2933"],
    others: {
      camera: "Canon EOS R5",
      lens: "24-70mm f/2.8",
      aperture: "f/8",
      shutter_speed: "1/250",
      iso: "100",
    },
  },

  tags: ["nature", "mountains", "sunset", "lake", "landscape", "travel"],
  user_id: "user_01J8ZK1H9P3Q7R5S2T4U6V8W",
  _count: {
    likes: 248,
  },
  engagement: {
    views: 12_847,
    downloads: 1_392,
    likes: 248,
  },
};

export const mockCollection: Collection = {
  id: "collection_01J8ZK7Y4Q9F2M6N8X3A5B7C",
  title: "Epic Mountain Landscapes",
  description:
    "A curated collection of breathtaking mountain views, peaceful lakes, and beautiful natural landscapes.",
  visibility: "PUBLIC",
  cover_image:
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200",
  creator_id: "user_01J8ZK1H9P3Q7R5S2T4U6V8W",
  created_at: "2026-08-15T10:30:00.000Z",
  updated_at: "2026-09-04T11:45:00.000Z",
  creator: {
    id: "user_01J8ZK1H9P3Q7R5S2T4U6V8W",
    name: "Alex Morgan",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  items: [
    {
      collection_id: "collection_01J8ZK7Y4Q9F2M6N8X3A5B7C",
      pic_id: "pic_01J8ZK7Y4Q9F2M6N8X3A5B7C",
      picture: {
        id: "pic_01J8ZK7Y4Q9F2M6N8X3A5B7C",
        title: "Sunset Over the Mountains",
        user_id: "user_01J8ZK1H9P3Q7R5S2T4U6V8W",
        src: [
          {
            resolution: Resolution.THUMBNAIL,
            url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=400",
            width: 400,
            height: 267,
            size: 45_000,
          },
        ],
      },
    },
  ],
};

describe("globalStateStore test", () => {
  it("initializes with default state", () => {
    const state = useGlobalStateStore.getState();
    expect(state.open).toBe(false);
    expect(state.image).toBeNull();
    expect(state.openCollectionModal).toBeNull();
  });

  it("sets the open state", () => {
    useGlobalStateStore.getState().setOpen(true, mockPicture);
    expect(useGlobalStateStore.getState().open).toBe(true);
    expect(useGlobalStateStore.getState().image).toBe(mockPicture);
  });

  it("sets the openCollectionModal state", () => {
    useGlobalStateStore.getState().setOpenCollectionModal(mockCollection);
    expect(useGlobalStateStore.getState().openCollectionModal).toBe(
      mockCollection,
    );
  });
});
