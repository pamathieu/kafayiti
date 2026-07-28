import { useEffect, useState } from "react";

/**
 * A useState-like hook that persists its value to localStorage.
 * Used to back the site's "edit mode" content changes, which are
 * local to the admin's browser only (no backend persistence yet).
 */
export function useLocalEditableState<T>(key: string, initialValue: T) {
  const storageKey = `kafa_edit_${key}`;

  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      return stored ? (JSON.parse(stored) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(value));
    } catch {
      // localStorage unavailable or quota exceeded — edits just won't persist
    }
  }, [storageKey, value]);

  return [value, setValue] as const;
}
