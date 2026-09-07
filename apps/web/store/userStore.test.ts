import { describe, it, expect } from "vitest";
import { useUserStore } from "./userStore";

describe("userStore test", () => {
  it("initializes with default state", () => {
    const state = useUserStore.getState();
    expect(state.isLoggedIn).toBe(false);
    expect(state.email).toBe("");
    expect(state.id).toBe("");
    expect(state.name).toBe("");
    expect(state.accessToken).toBe("");
    expect(state.avatar).toBe(
      "https://cdn-icons-png.flaticon.com/512/3177/3177440.png",
    );
  });

  it("sets the user state", () => {
    useUserStore.getState().setUser({
      isLoggedIn: true,
      email: "test@example.com",
      id: "user_1",
      name: "Test User",
      accessToken: "token",
      avatar: "https://example.com/avatar.png",
    });
    expect(useUserStore.getState().isLoggedIn).toBe(true);
    expect(useUserStore.getState().email).toBe("test@example.com");
    expect(useUserStore.getState().id).toBe("user_1");
    expect(useUserStore.getState().name).toBe("Test User");
    expect(useUserStore.getState().avatar).toBe(
      "https://example.com/avatar.png",
    );
  });
});
