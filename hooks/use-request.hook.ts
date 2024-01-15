import { RequestCall } from "@/types";
import { useEffect, useRef, useState } from "react";

type HandleRequestOptions = {
  handleError?: (err: unknown) => string;
};

export function useRequest<T>() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }

      controllerRef.current = null;
      setIsLoading(false);
    };
  }, []);

  async function handleRequest(
    requestCall: RequestCall<T>,
    options: HandleRequestOptions = {},
  ) {
    const { handleError = () => "Something went wrong" } = options;

    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    try {
      setIsLoading(true);
      controllerRef.current = requestCall.controller;
      const data = await requestCall();
      setData(data);
      setError(null);
    } catch (error) {
      setError(handleError(error));
    } finally {
      controllerRef.current = null;
      setIsLoading(false);
    }
  }

  return { isLoading, error, data, handleRequest };
}
