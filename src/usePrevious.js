import { useEffect, useRef } from "react";

/**
 * usePrevious - Custom hook to store the previous value of a state or prop.
 *
 * @param {any} value - The current value to track
 * @returns {any} - The previous value
 *
 * @example
 * import { usePrevious } from "react-hooks";
 * import React, { useState } from "react";
 *
 * const [count, setCount] = useState(0);
 * const prevCount = usePrevious(count);
 *
 * console.log("Current:", count, "Previous:", prevCount);
 */
export default function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

/*** Sample usage (commented) ***/
// import React, { useState } from "react";
// import { usePrevious } from "react-hooks";

// function PreviousDemo() {
//   const [count, setCount] = useState(0);
//   const prevCount = usePrevious(count);

//   return (
//     <div>
//       <p>Current: {count}</p>
//       <p>Previous: {prevCount}</p>
//       <button onClick={() => setCount(count + 1)}>Increment</button>
//     </div>
//   );
// }

// export default PreviousDemo;
