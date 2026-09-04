import { describe, it, expect } from "vitest";
import { createProfileStore } from "./profileStore";
import type { ProfileStore } from "@/@types";

describe("profileStore test", () => {
  it("initializes with default state", () => {
    const profileStore = createProfileStore();
    const state = profileStore.getState();

    expect(state.isLoading).toBeTruthy();
    expect(state.id).toBe("");
    expect(state.name).toBe("");
    expect(state.email).toBe("");
    expect(state.joined_at).toBe("");
    expect(state.avatar).toBe("");
    expect(state.bio).toBe("");
    expect(state.is_verified).toBeFalsy();
    expect(state.location).toBe("");
    expect(state._count).toBeNull();
    expect(state.metrics).toBeNull();
    expect(state.links).toBeNull();
  });

  it("sets data correctly when setData is called", () => {
    const profileStore = createProfileStore();
    const mockData = {
      id: "123",
      name: "John Doe",
      email: "[EMAIL_ADDRESS]",
      joined_at: "2022-01-01",
      avatar: "https://example.com/avatar.png",
      bio: "Software Engineer",
      is_verified: true,
      location: "New York",
      _count: {} as ProfileStore["_count"],
      metrics: {} as ProfileStore["metrics"],
      links: [] as ProfileStore["links"],
    };

    profileStore.getState().setData(mockData);
    const state = profileStore.getState();

    expect(state.id).toBe(mockData.id);
    expect(state.name).toBe(mockData.name);
    expect(state.email).toBe(mockData.email);
    expect(state.joined_at).toBe(mockData.joined_at);
    expect(state.avatar).toBe(mockData.avatar);
    expect(state.bio).toBe(mockData.bio);
    expect(state.is_verified).toBe(mockData.is_verified);
    expect(state.location).toBe(mockData.location);
    expect(state._count).toBe(mockData._count);
    expect(state.metrics).toBe(mockData.metrics);
    expect(state.links).toBe(mockData.links);
    expect(state.isLoading).toBe(false);
  });

  it("sets isLoading to false when setData is called", () => {
    const profileStore = createProfileStore();

    profileStore.getState().setData({
      id: "",
      name: "",
      email: "",
      joined_at: "",
      avatar: "",
      bio: "",
      is_verified: false,
      location: "",
      _count: null,
      metrics: null,
      links: null,
    });

    expect(profileStore.getState().isLoading).toBe(false);
  });
});
