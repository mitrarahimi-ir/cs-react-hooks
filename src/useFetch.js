import { useState, useEffect, useCallback, useRef, useMemo } from "react";

/**
 * useFetch - A highly optimized and reusable React hook for fetching data.
 *
 * Features:
 * - Handles loading, error, and data state
 * - Supports automatic cancellation when component unmounts or URL changes
 * - Supports manual fetch trigger
 * - Supports flexible response types (json, text, blob)
 *
 * @param {string} url - The URL to fetch data from
 * @param {object} [options] - Fetch options and custom settings
 * @param {boolean} [options.manual=false] - If true, fetch won't execute automatically
 * @param {'json'|'text'|'blob'} [options.responseType='json'] - Expected response type
 * @returns {{
 *   data: any,
 *   error: Error | null,
 *   loading: boolean,
 *   refetch: function
 * }}
 *
 * @example
 * import { useFetch } from "./useFetch";
 *
 * function App() {
 *   const { data, error, loading, refetch } = useFetch("https://api.example.com/user");
 *
 *   if (loading) return <p>Loading...</p>;
 *   if (error) return <p>Error: {error.message}</p>;
 *
 *   return (
 *     <div>
 *       <p>Name: {data?.name}</p>
 *       <button onClick={refetch}>Reload</button>
 *     </div>
 *   );
 * }
 */
export function useFetch(url, options = {}) {
  const { manual = false, responseType = "json", ...fetchOptions } = options;

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(!manual);

  const abortController = useRef(null);

  // Memoize fetchOptions to prevent unnecessary re-renders
  const stableFetchOptions = useMemo(
    () => fetchOptions,
    [JSON.stringify(fetchOptions)],
  );

  const fetchData = useCallback(async () => {
    if (!url) {
      console.warn("useFetch: URL is required");
      return;
    }

    // Cancel previous request if any
    if (abortController.current) {
      abortController.current.abort();
    }

    const controller = new AbortController();
    abortController.current = controller;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        signal: controller.signal,
        ...stableFetchOptions,
      });
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      let result;
      if (responseType === "json") {
        result = await response.json();
      } else if (responseType === "text") {
        result = await response.text();
      } else if (responseType === "blob") {
        result = await response.blob();
      } else {
        throw new Error(`Unsupported responseType: ${responseType}`);
      }

      setData(result);
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  }, [url, stableFetchOptions, responseType]);

  useEffect(() => {
    if (!manual) {
      fetchData();
    }

    return () => {
      if (abortController.current) {
        abortController.current.abort();
      }
    };
  }, [fetchData, manual]);

  const refetch = useCallback(() => {
    return fetchData();
  }, [fetchData]);

  return { data, error, loading, refetch };
}
