export type RequestCall<T> = {
  (): Promise<T>;
  controller: AbortController;
};
