import { useState, useEffect, useCallback } from 'react';

interface FetchOptions {
  params?: Record<string, any>;
}

interface UseFetchResult<T> {
  data: T[] | null;
  isLoading: boolean;
  error: string | null;
  refetch: (options?: FetchOptions) => void;
}

export function useFetch<T>(url: string): UseFetchResult<T> {
  const [data, setData] = useState<T[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (options?: FetchOptions) => {
    setIsLoading(true);
    setError(null);

    try {
      const queryParams = options?.params
        ? '?' + new URLSearchParams(options.params).toString()
        : '';
      const response = await fetch(url + queryParams);
      if (!response.ok) {
        throw new Error(`Ошибка ${response.status}`);
      }
      const result = (await response.json()) as T[]; // Приводим к массиву T
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refetch: fetchData };
}
