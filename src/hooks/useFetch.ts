import { useEffect, useState } from "react";

export const useFetch = <T>(callback: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<unknown>(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    setTimeout(async () => {
      try {
        const result = await callback();

        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }, 2000);
  }, []);

  return { data, error, isLoading };
};
