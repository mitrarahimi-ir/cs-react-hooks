import { useEffect, useRef } from "react";

/**
 * useInterval - Custom hook for setInterval in React
 * Handles cleanup and allows dynamic callback and delay.
 *
 * @param {function} callback - Function to execute every interval
 * @param {number|null} delay - Interval delay in milliseconds. Set to null to pause.
 *
 * @example
 * import { useInterval } from "react-hooks";
 *
 * const [count, setCount] = useState(0);
 * useInterval(() => {
 *   setCount(prev => prev + 1);
 * }, 1000); // increment every second
 */
export default function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) return;

    const id = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(id); // Cleanup on unmount or delay change
  }, [delay]);
}

/*** Sample usage (commented) ***/
// import React, { useState } from "react";
// import { useInterval } from "react-hooks";

// function IntervalDemo() {
//   const [count, setCount] = useState(0);

//   useInterval(() => {
//     setCount(prev => prev + 1);
//   }, 1000); // every 1 second

//   return <p>Count: {count}</p>;
// }

// export default IntervalDemo;
