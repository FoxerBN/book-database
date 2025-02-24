import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = <T,>(url: string, cacheKey?: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (cacheKey) {
          const cachedData = localStorage.getItem(cacheKey);
          if (cachedData) {
            setData(JSON.parse(cachedData));
            setLoading(false);
            return;
          }
        }

        const response = await axios.get<T>(url);
        setData(response.data);

        if (cacheKey) {
          localStorage.setItem(cacheKey, JSON.stringify(response.data));
        }
      } catch (err) {
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, cacheKey]);

  return { data, loading, error };
};

export default useFetch;
