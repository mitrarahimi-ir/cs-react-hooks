import { useEffect } from "react";

/**
 * useOnClickOutside - Detect clicks outside a given ref element
 *
 * @param {React.RefObject} ref - The ref to the element to detect outside clicks
 * @param {function} handler - Function to call when a click outside is detected
 *
 * @example
 * import { useOnClickOutside } from "react-hooks";
 * import React, { useRef, useState } from "react";
 *
 * function Dropdown() {
 *   const ref = useRef();
 *   const [open, setOpen] = useState(false);
 *   useOnClickOutside(ref, () => setOpen(false));
 *
 *   return (
 *     <div ref={ref}>
 *       <button onClick={() => setOpen(!open)}>Toggle</button>
 *       {open && <div className="dropdown">Dropdown content</div>}
 *     </div>
 *   );
 * }
 */
export default function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      // Do nothing if clicking ref element or its descendants
      if (!ref.current || ref.current.contains(event.target)) return;
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

/*** Sample usage (commented) ***/
// import React, { useRef, useState } from "react";
// import { useOnClickOutside } from "react-hooks";

// function DropdownDemo() {
//   const ref = useRef();
//   const [open, setOpen] = useState(false);

//   useOnClickOutside(ref, () => setOpen(false));

//   return (
//     <div ref={ref}>
//       <button onClick={() => setOpen(!open)}>Toggle Dropdown</button>
//       {open && <div className="dropdown">Dropdown content</div>}
//     </div>
//   );
// }

// export default DropdownDemo;
