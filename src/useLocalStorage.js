import { useState } from "react";

/**
 * useLocalStorage - Synchronizes React state with localStorage.
 * This hook allows you to persist a state value across page reloads.
 *
 * @param {string} key - The key to store the value under in localStorage.
 * @param {any} initialValue - The initial value if none exists in localStorage.
 * @returns {[any, function]} - Returns an array [value, setValue], similar to useState.
 *
 * @example
 * const [name, setName] = useLocalStorage("name", "Mitra");
 * setName("New Name"); // update value and localStorage
 */
export default function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

/*** Sample usage (commented) ***/
// import React from "react";
// import { useLocalStorage } from "react-hooks";

// function LocalStorageDemo() {
//   const [name, setName] = useLocalStorage("name", "Mitra");

//   return (
//     <div>
//       <input
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         placeholder="Enter your name"
//       />
//       <p>Hello, {name}!</p>
//     </div>
//   );
// }

// export default LocalStorageDemo;
