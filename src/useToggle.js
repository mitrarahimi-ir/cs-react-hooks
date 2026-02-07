import { useState, useCallback } from "react";

/**
 * useToggle - هوک برای مدیریت boolean state
 * @param {boolean} initialValue مقدار اولیه (پیش‌فرض false)
 * @returns {Array} [state, toggle, setTrue, setFalse]
 */
export default function useToggle(initialValue = false) {
  const [state, setState] = useState(initialValue);

  // تابع toggle با useCallback برای جلوگیری از رندر اضافه
  const toggle = useCallback(() => setState((prev) => !prev), []);

  // setState مستقیم برای true
  const setTrue = useCallback(() => setState(true), []);

  // setState مستقیم برای false
  const setFalse = useCallback(() => setState(false), []);

  return [state, toggle, setTrue, setFalse];
}
