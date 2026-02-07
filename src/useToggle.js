import { useState, useCallback } from "react";

/**
 * useToggle - Toggle boolean state easily.
 *
 * @param {boolean} initialValue - Initial boolean value (default: false)
 * @returns {[boolean, function, function, function]} - [state, toggle, setTrue, setFalse]
 *
 * @example
 * import { useToggle } from "cs-react-hooks";
 *
 * const [isOpen, toggle, open, close] = useToggle(false);
 *
 * toggle(); // switch true/false
 * open();   // set true
 * close();  // set false
 */
export default function useToggle(initialValue = false) {
  const [state, setState] = useState(initialValue);

  const toggle = useCallback(() => setState((prev) => !prev), []);
  const setTrue = useCallback(() => setState(true), []);
  const setFalse = useCallback(() => setState(false), []);

  return [state, toggle, setTrue, setFalse];
}

/*** Sample usage ***/
// import React from "react";
// import { useToggle } from "cs-react-hooks";
//
// function ToggleDemo() {
//   const [isOpen, toggle, open, close] = useToggle(false);
//
//   return (
//     <div>
//       <button onClick={toggle}>Toggle</button>
//       <button onClick={open}>Open</button>
//       <button onClick={close}>Close</button>
//       {isOpen && <p>Content is open!</p>}
//     </div>
//   );
// }
