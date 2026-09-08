import { useUserStore } from "@/store";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import * as Sentry from "@sentry/nextjs";

const INTERNAL_TOKEN_TTL = 60_000;

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
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (!originalRequest) {
      Sentry.captureException(error);
      return Promise.reject(error);
    }

    if (originalRequest.url?.includes("/refresh-token")) {
      return Promise.reject(error);
    }

    const status = error.response?.status;
    const url = originalRequest.url ?? "unknown";
    const method = originalRequest.method?.toUpperCase() ?? "UNKNOWN";

    if (
      status === 401 &&
      !url.includes("/refresh-token") &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const response = await api.get("/user/refresh-token");

        const newToken = response.data.data.accessToken;

        useUserStore.getState().setUser({ accessToken: newToken });

        originalRequest.headers.set("Authorization", `Bearer ${newToken}`);

        return api(originalRequest);
      } catch (refreshError) {
        Sentry.withScope((scope) => {
          scope.setTag("error.type", "token_refresh");
          scope.setTag("http.method", "GET");
          scope.setTag("http.status_code", "401");

          scope.setContext("api", {
            endpoint: "/user/refresh-token",
          });

          Sentry.captureException(refreshError);
        });

        return Promise.reject(refreshError);
      }
    }

    if (status === 401) {
      return Promise.reject(error);
    }

    if (status && status >= 500) {
      Sentry.withScope((scope) => {
        scope.setTag("error.type", "api");
        scope.setTag("http.method", method);
        scope.setTag("http.status_code", String(status));

        scope.setContext("api", {
          url,
          method,
          status,
          statusText: error.response?.statusText,
        });

        Sentry.captureException(error);
      });
    }

    if (!error.response) {
      Sentry.withScope((scope) => {
        scope.setTag("error.type", "network");

        scope.setContext("api", {
          url,
          method,
          message: error.message,
          code: error.code,
        });

        Sentry.captureException(error);
      });
    }

    return Promise.reject(error);
  },
);
