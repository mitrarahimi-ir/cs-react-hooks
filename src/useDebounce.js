import { useState, useEffect } from "react";

/**
 * useDebounce - Debounces a value, delaying its update until after a specified delay.
 * This is useful for limiting the rate of executing expensive operations like API calls.
 *
 * @param {any} value - The value to debounce.
 * @param {number} delay - The debounce delay in milliseconds (default is 500ms).
 * @returns {any} - The debounced value.
 *
 * @example
 * import React, { useState, useEffect } from "react";
 * import { useDebounce } from "react-hooks";
 *
 * const [query, setQuery] = useState("");
 * const debouncedQuery = useDebounce(query, 500);
 *
 * useEffect(() => {
 *   if (debouncedQuery) {
 *     // Example: perform API call with debouncedQuery
 *     console.log("Search API call with:", debouncedQuery);
 *   }
 * }, [debouncedQuery]);
 */
export default function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set a timeout to update the debounced value after the delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup the timeout if value or delay changes, or on unmount
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/*** Sample usage (commented) ***/
// import React, { useState, useEffect } from "react";
// import { useDebounce } from "react-hooks";

// function DebounceDemo() {
//   const [query, setQuery] = useState("");
//   const debouncedQuery = useDebounce(query, 500);

//   useEffect(() => {
//     if (debouncedQuery) {
//       console.log("API call with debounced value:", debouncedQuery);
//     }
//   }, [debouncedQuery]);

//   return (
//     <div>
//       <input
//         type="text"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         placeholder="Type to search"
//       />
//       <p>Debounced value: {debouncedQuery}</p>
//     </div>
//   );
// }

// export default DebounceDemo;
