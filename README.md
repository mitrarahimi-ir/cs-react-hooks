# React Hooks Library

This library provides custom React hooks for common patterns in React applications.  
Currently included hooks:

- `useToggle` - Toggle boolean state easily  
- `useDebounce` - Debounce a value for inputs, API calls, etc.  
- `useLocalStorage` - Synchronize state with localStorage  
- `useFetch` - Fetch data from APIs with loading & error state  
- `useInterval` - Set up intervals safely in React  
- `usePrevious` - Get the previous value of a state or prop  
- `useMediaQuery` - Track media query matches for responsive designs  
- `useOnClickOutside` - Detect clicks outside a referenced element  

**Note:** Full usage examples are included **inside each hook file** as:

- `JSDoc @example` for IDE tooltips and documentation  
- Commented sample usage for quick practical testing  

---

## Quick Import

All hooks can be imported from a single entry point:

```javascript
import {
  useToggle,
  useDebounce,
  useLocalStorage,
  useFetch,
  useInterval,
  usePrevious,
  useMediaQuery,
  useOnClickOutside
} from "react-hooks";
```

## Quick Example
```
import React, { useState, useEffect } from "react";
import { useToggle, useDebounce, useLocalStorage } from "react-hooks";

function Demo() {
  const [isOpen, toggle] = useToggle(false);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const [name, setName] = useLocalStorage("name", "Mitra");

  useEffect(() => {
    if (debouncedQuery) {
      console.log("Search with:", debouncedQuery);
    }
  }, [debouncedQuery]);

  return (
    <div>
      <button onClick={toggle}>Toggle</button>
      {isOpen && <p>Content is open!</p>}

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <p>Hello, {name}!</p>
    </div>
  );
}

export default Demo;
```

## Notes

- All hooks are fully typed for TypeScript users (if you add type definitions)

- Works in React 16.8+ (supports hooks)

- Examples inside each hook file demonstrate both JSDoc @example usage and commented React components

- Ideal for rapid prototyping and reusable state management



## Installation

npm install react-hooks
# or
yarn add react-hooks

