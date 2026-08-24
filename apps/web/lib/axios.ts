import { useUserStore } from "@/store";
import axios from "axios";

const INTERNAL_TOKEN_TTL = 55_000;

let internalToken: string | null = null;
let internalTokenExpiresAt = 0;
let internalTokenPromise: Promise<string | null> | null = null;

const tokenClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

const getInternalToken = async (): Promise<string | null> => {
  if (internalToken && Date.now() < internalTokenExpiresAt) {
    return internalToken;
  }

  if (!internalTokenPromise) {
    internalTokenPromise = (async () => {
      try {
        const response = await tokenClient.get("/internal-token");
        internalToken = response.data.token ?? null;
        internalTokenExpiresAt = Date.now() + INTERNAL_TOKEN_TTL;
        return internalToken;
      } catch {
        internalToken = null;
        return null;
      } finally {
        internalTokenPromise = null;
      }
    })();
  }
  return internalTokenPromise;
};

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  const internalToken = await getInternalToken();
  if (internalToken) {
    config.headers.set("x-internal-token", internalToken);
  }

  const accessToken = useUserStore.getState().accessToken;
  if (accessToken) {
    config.headers.set("Authorization", `Bearer ${accessToken}`);
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (!originalRequest) {
      return Promise.reject(error);
    }

    if (originalRequest.url?.includes("/refresh-token")) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await api.get("/user/refresh-token");
        const newToken = response.data.data.accessToken;
        useUserStore.getState().setUser({ accessToken: newToken });
        originalRequest.headers.set("Authorization", `Bearer ${newToken}`);
        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
