import { useState, useEffect } from "react";

/**
 * useFetch - Custom hook to fetch data from an API.
 * Handles loading, error, and data state.
 *
 * @param {string} url - The API endpoint to fetch data from.
 * @param {object} options - Optional fetch options (method, headers, body, etc.)
 * @returns {{ data: any, loading: boolean, error: any }}
 *          - Object containing fetched data, loading state, and error.
 *
 * @example
 * import { useFetch } from "react-hooks";
 *
 * const { data, loading, error } = useFetch("https://api.example.com/users");
 *
 * if (loading) console.log("Loading...");
 * if (error) console.error(error);
 * console.log(data);
 */
export default function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();
    const signal = controller.signal;

    setLoading(true);
    setError(null);

    fetch(url, { ...options, signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((json) => setData(json))
      .catch((err) => {
        if (err.name !== "AbortError") setError(err);
      })
      .finally(() => setLoading(false));

    // Cleanup: cancel fetch on unmount or url/options change
    return () => controller.abort();
  }, [url, JSON.stringify(options)]); // include options in deps safely

  return { data, loading, error };
}

/*** Sample usage (commented) ***/
// import React from "react";
// import { useFetch } from "react-hooks";

// function FetchDemo() {
//   const { data, loading, error } = useFetch("https://jsonplaceholder.typicode.com/users");

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   return (
//     <ul>
//       {data.map(user => (
//         <li key={user.id}>{user.name}</li>
//       ))}
//     </ul>
//   );
// }

// export default FetchDemo;
