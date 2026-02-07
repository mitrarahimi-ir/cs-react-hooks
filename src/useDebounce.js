import { useState, useEffect } from "react";

/**
 * useLocalStorage Hook
 * --------------------
 * A custom React hook that synchronizes a state variable with localStorage.
 *
 * Features:
 * 1. Initializes state from localStorage if available, otherwise uses the provided initial value.
 * 2. Updates localStorage whenever the state changes.
 * 3. Listens for localStorage changes from other tabs and updates state accordingly.
 *
 * @param {string} key - The key under which the value is stored in localStorage.
 * @param {any} initialValue - The default value to use if the key is not found in localStorage.
 * @returns {[any, Function]} Returns a tuple: [value, setValue]
 *
 * @example
 * // Example 1: Using with a simple string value
 * const [name, setName] = useLocalStorage("userName", "Mitra");
 * setName("Mehrad");
 *
 * // Example 2: Using a setter function to update previous state
 * setName(prev => prev + " Khan"); // Concatenates previous value
 *
 * // Example 3: Using with objects
 * const [settings, setSettings] = useLocalStorage("settings", { darkMode: false });
 * setSettings(prev => ({ ...prev, darkMode: true }));
 *
 * // Example 4: Works across browser tabs
 * // If "settings" changes in another tab, this hook updates automatically.
 */
function useLocalStorage(key, initialValue) {
  // Initialize state from localStorage or fallback to initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      // Parse the stored JSON value or return the initial value if not found
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`useLocalStorage: Error reading key "${key}"`, error);
      return initialValue;
    }
  });

  /**
   * Setter function to update state and localStorage
   * @param {any | Function} value - New value or a function receiving the previous state
   *
   * Usage:
   * setValue(newValue);          // Set directly
   * setValue(prev => prev + 1);  // Functional update based on previous state
   */
  const setValue = (value) => {
    try {
      // Determine new value (support functional updates)
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      // Update React state
      setStoredValue(valueToStore);

      // Update localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`useLocalStorage: Error setting key "${key}"`, error);
    }
  };

  /**
   * Listen for localStorage changes from other tabs/windows
   * and update state if the relevant key changes.
   */
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === key) {
        try {
          setStoredValue(event.newValue ? JSON.parse(event.newValue) : null);
        } catch (error) {
          console.error(
            `useLocalStorage: Error parsing storage event for key "${key}"`,
            error,
          );
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Cleanup listener on unmount
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key]);

  // Return the state and setter function
  return [storedValue, setValue];
}

export default useLocalStorage;
