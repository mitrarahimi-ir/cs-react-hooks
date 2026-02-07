import { useState, useEffect } from "react";

/**
 * useMediaQuery - Custom hook to track media query matches
 *
 * @param {string} query - A CSS media query string (e.g. '(min-width: 768px)')
 * @returns {boolean} - True if the media query matches, false otherwise
 *
 * @example
 * import { useMediaQuery } from "react-hooks";
 *
 * const isTablet = useMediaQuery("(min-width: 768px)");
 * if (isTablet) {
 *   console.log("Screen is at least 768px wide");
 * }
 */
export default function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQueryList = window.matchMedia(query);

    const listener = (event) => setMatches(event.matches);
    mediaQueryList.addEventListener
      ? mediaQueryList.addEventListener("change", listener)
      : mediaQueryList.addListener(listener); // support older browsers

    // Set initial state
    setMatches(mediaQueryList.matches);

    return () => {
      mediaQueryList.removeEventListener
        ? mediaQueryList.removeEventListener("change", listener)
        : mediaQueryList.removeListener(listener);
    };
  }, [query]);

  return matches;
}

/*** Sample usage (commented) ***/
// import React from "react";
// import { useMediaQuery } from "react-hooks";

// function MediaQueryDemo() {
//   const isTablet = useMediaQuery("(min-width: 768px)");

//   return (
//     <div>
//       {isTablet ? <p>Tablet or larger screen</p> : <p>Mobile screen</p>}
//     </div>
//   );
// }

// export default MediaQueryDemo;
