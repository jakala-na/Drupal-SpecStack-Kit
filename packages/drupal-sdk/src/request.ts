import { useCallback } from "react";
import { useCsrfToken } from "./provider";

function needsCsrfToken(method?: string): boolean {
  return Boolean(method && method.toUpperCase() !== "GET");
}

export function useDrupalRequest() {
  const { ensureToken } = useCsrfToken();

  return useCallback(
    async <T>(path: string, init: RequestInit = {}): Promise<T> => {
      const headers = new Headers(init.headers);
      headers.set("Accept", "application/json");

      if (needsCsrfToken(init.method)) {
        headers.set("Content-Type", "application/json");
        headers.set("X-CSRF-Token", await ensureToken());
      }

      const response = await fetch(path, {
        ...init,
        credentials: "same-origin",
        headers,
      });

      if (!response.ok) {
        throw new Error(`Request failed with ${response.status}.`);
      }

      if (response.status === 204) {
        return undefined as T;
      }

      return response.json() as Promise<T>;
    },
    [ensureToken],
  );
}
