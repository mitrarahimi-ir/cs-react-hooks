import { useState, useCallback } from "react";

/**
 * useToggle - A custom hook for managing boolean state.
 * This hook provides a boolean value and convenient functions to toggle it.
 *
 * @param {boolean} initialValue - Initial boolean value (default is false)
 * @returns {[boolean, function, function, function]}
 *          - Returns [state, toggle, setTrue, setFalse]
 *
 * @example
 * import React from "react";
 * import { useToggle } from "react-hooks";
 *
 * const [isOpen, toggle, open, close] = useToggle(false);
 *
 * return (
 *   <div>
 *     <button onClick={toggle}>Toggle</button>
 *     <button onClick={open}>Open</button>
 *     <button onClick={close}>Close</button>
 *     {isOpen && <p>Content is open!</p>}
 *   </div>
 * );
 */
export default function useToggle(initialValue = false) {
  const [state, setState] = useState(initialValue);

  // toggle function to switch boolean state
  const toggle = useCallback(() => setState((prev) => !prev), []);

  // set state to true directly
  const setTrue = useCallback(() => setState(true), []);

  // set state to false directly
  const setFalse = useCallback(() => setState(false), []);

  return [state, toggle, setTrue, setFalse];
}

/*** Sample usage (commented) ***/
// import React from "react";
// import { useToggle } from "react-hooks";

// function ToggleDemo() {
//   const [isOpen, toggle, open, close] = useToggle(false);

//   return (
//     <div>
//       <button onClick={toggle}>Toggle</button>
//       <button onClick={open}>Open</button>
//       <button onClick={close}>Close</button>
//       {isOpen && <p>Content is open!</p>}
//     </div>
//   );
// }

// export default ToggleDemo;
