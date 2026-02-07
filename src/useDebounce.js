import { useState, useEffect } from "react";

/**
 * useDebounce - Debounces a value, delaying its update until after a specified delay.
 * Useful for limiting the rate of executing expensive operations like API calls.
 *
 * @param {any} value - The value to debounce.
 * @param {number} delay - The debounce delay in milliseconds (default is 500ms).
 * @returns {any} - The debounced value.
 *
 * @example
 * const [query, setQuery] = useState("");
 * const debouncedQuery = useDebounce(query, 500);
 * useEffect(() => {
 *   if (debouncedQuery) {
 *     // perform API call with debouncedQuery
 *   }
 * }, [debouncedQuery]);
 */
export default function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set a timeout to update the debounced value
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup timeout if value or delay changes or on unmount
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
