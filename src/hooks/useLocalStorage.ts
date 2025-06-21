/**
 * @file useLocalStorage.ts
 * @description Defines a custom React hook for managing state that persists in localStorage.
 * This hook allows components to easily store and retrieve data from localStorage
 * while synchronizing it with React component state.
 */
import { useState } from 'react';

/**
 * A custom React hook that syncs state with localStorage.
 * It attempts to retrieve the initial state from localStorage based on the provided key.
 * If no value is found, or if localStorage is unavailable/data is malformed, it uses the provided initialValue.
 * Updates to the state are automatically persisted to localStorage.
 *
 * @template T The type of the value to be stored.
 * @param {string} key The key under which the value is stored in localStorage.
 * @param {T} initialValue The initial value to use if no value is found in localStorage or if localStorage is unavailable.
 * @returns {[T, (value: T | ((val: T) => T)) => void]} A tuple containing the current stateful value and a function to update it.
 * The update function works like the one returned by `useState`.
 */
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  /**
   * State initialization function.
   * Tries to get the value from localStorage. If it fails, returns initialValue.
   */
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      if (!item) return initialValue;
      try {
        return JSON.parse(item) as T;
      } catch {
        // Si no es JSON válido, devuelve el string plano si es del tipo esperado
        return item as unknown as T;
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  /**
   * Function to update the state and persist it to localStorage.
   * This function is memoized and will only be recreated if `key` or `storedValue` changes.
   */
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  // This useEffect is not strictly necessary if we only set localStorage on setValue,
  // but it can be useful if the key or initialValue changes externally,
  // or if we want to ensure localStorage is updated if `storedValue` was changed by other means
  // (though that shouldn't happen with standard useState usage).
  // For this implementation, `setValue` handles the localStorage update, making this useEffect redundant
  // for the primary goal of persisting on change. However, if the `key` prop could change,
  // then an effect to re-sync from localStorage for the new key might be needed.
  // Given the typical usage (key is constant), this is fine.

  return [storedValue, setValue];
}

export default useLocalStorage;
