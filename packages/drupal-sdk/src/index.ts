export type JsonApiError = {
  message: string;
  status?: number;
};

export { DrupalSdkProvider, getCsrfToken, useCsrfToken } from "./provider";
export type { DrupalSdkProviderProps } from "./provider";
export { useDrupalRequest } from "./request";
export {
  useCreateHelloWorld,
  useDeleteHelloWorld,
  useHelloWorld,
  useUpdateHelloWorld,
} from "./apis/hello-world/hooks";
export type { HelloWorld, HelloWorldInput } from "./apis/hello-world/hooks";
