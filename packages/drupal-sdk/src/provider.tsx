import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type CsrfTokenContextValue = {
  token?: string;
  setToken: (token: string) => void;
};

export type DrupalSdkProviderProps = {
  children: ReactNode;
  queryClient?: QueryClient;
};

const CsrfTokenContext = createContext<CsrfTokenContextValue | null>(null);

let cachedToken: string | undefined;
let pendingTokenFetch: Promise<string> | undefined;

export async function getCsrfToken(): Promise<string> {
  const response = await fetch("/session/token", {
    credentials: "same-origin",
  });

  if (!response.ok) {
    throw new Error("Unable to load Drupal CSRF token.");
  }

  return response.text();
}

function createDefaultQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 60 * 1000,
      },
      mutations: {
        retry: false,
      },
    },
  });
}

export function DrupalSdkProvider({ children, queryClient }: DrupalSdkProviderProps) {
  const [token, setTokenState] = useState<string | undefined>(cachedToken);
  const [defaultQueryClient] = useState(createDefaultQueryClient);

  const setToken = useCallback((nextToken: string) => {
    cachedToken = nextToken;
    setTokenState(nextToken);
  }, []);

  const value = useMemo(
    () => ({
      token,
      setToken,
    }),
    [setToken, token],
  );

  return (
    <CsrfTokenContext.Provider value={value}>
      <QueryClientProvider client={queryClient ?? defaultQueryClient}>
        {children}
      </QueryClientProvider>
    </CsrfTokenContext.Provider>
  );
}

export function useCsrfToken() {
  const context = useContext(CsrfTokenContext);

  if (!context) {
    throw new Error("useCsrfToken must be used within a DrupalSdkProvider.");
  }

  const ensureToken = useCallback(async () => {
    if (cachedToken) {
      return cachedToken;
    }

    if (context.token) {
      cachedToken = context.token;
      return context.token;
    }

    if (pendingTokenFetch) {
      return pendingTokenFetch;
    }

    pendingTokenFetch = (async () => {
      try {
        const nextToken = await getCsrfToken();
        context.setToken(nextToken);
        return nextToken;
      } finally {
        pendingTokenFetch = undefined;
      }
    })();

    return pendingTokenFetch;
  }, [context]);

  return {
    ensureToken,
    token: context.token,
  };
}
