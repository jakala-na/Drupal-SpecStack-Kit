import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCsrfToken } from "../../provider";
import {
  getApiV1HelloWorldOptions,
  getApiV1HelloWorldQueryKey,
} from "../../openapi-clients/specstack/@tanstack/react-query.gen";
import {
  deleteApiV1HelloWorldById,
  patchApiV1HelloWorldById,
  postApiV1HelloWorld,
} from "../../openapi-clients/specstack/sdk.gen";
import type { HelloWorldInput } from "../../openapi-clients/specstack/types.gen";

const clientOptions = {
  credentials: "same-origin" as const,
};

export function useHelloWorld() {
  return useQuery(getApiV1HelloWorldOptions(clientOptions));
}

export function useCreateHelloWorld() {
  const { ensureToken } = useCsrfToken();
  const queryClient = useQueryClient();
  const queryKey = getApiV1HelloWorldQueryKey(clientOptions);

  return useMutation({
    mutationFn: async (body: HelloWorldInput) => {
      const token = await ensureToken();

      const { data } = await postApiV1HelloWorld({
        ...clientOptions,
        body,
        headers: {
          "X-CSRF-Token": token,
        },
        throwOnError: true,
      });

      return data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey });
    },
  });
}

export function useUpdateHelloWorld() {
  const { ensureToken } = useCsrfToken();
  const queryClient = useQueryClient();
  const queryKey = getApiV1HelloWorldQueryKey(clientOptions);

  return useMutation({
    mutationFn: async ({ id, body }: { id: number; body: HelloWorldInput }) => {
      const token = await ensureToken();

      const { data } = await patchApiV1HelloWorldById({
        ...clientOptions,
        body,
        path: { id },
        headers: {
          "X-CSRF-Token": token,
        },
        throwOnError: true,
      });

      return data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey });
    },
  });
}

export function useDeleteHelloWorld() {
  const { ensureToken } = useCsrfToken();
  const queryClient = useQueryClient();
  const queryKey = getApiV1HelloWorldQueryKey(clientOptions);

  return useMutation({
    mutationFn: async (id: number) => {
      const token = await ensureToken();

      return deleteApiV1HelloWorldById({
        ...clientOptions,
        path: { id },
        headers: {
          "X-CSRF-Token": token,
        },
        throwOnError: true,
      });
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey });
    },
  });
}

export type { HelloWorld, HelloWorldInput } from "../../openapi-clients/specstack/types.gen";
