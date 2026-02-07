# React Hooks Library

This library provides custom React hooks like `useToggle`, `useDebounce`, and `useLocalStorage`.

**Note:** Full usage examples are included **inside each hook file** as:

- `JSDoc @example` for IDE tooltips and documentation.
- Commented sample usage for quick practical testing.

### Quick Example

import { useToggle, useDebounce, useLocalStorage } from "react-hooks";

const [isOpen, toggle] = useToggle(false);
const debouncedValue = useDebounce("search", 500);
const [name, setName] = useLocalStorage("name", "Mitra");

// Example usage
console.log(isOpen, debouncedValue, name);

