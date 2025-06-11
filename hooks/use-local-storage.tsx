import { useEffect, useState } from 'react';

const useLocalStorage = <T,>(key: string, initialValue: T): [T, (value: T) => void] => {
  // İlk olarak localStorage'dan değeri alalım
  const item = window.localStorage.getItem(key);
  const initial = item
    ? typeof initialValue === 'string'
      ? item
      : JSON.parse(item)
    : initialValue;

  const [storedValue, setStoredValue] = useState(initial);

  useEffect(() => {
    // Retrieve from localStorage
    const item = window.localStorage.getItem(key);
    if (item) {
      // Eğer Level tipindeyse JSON.parse yerine doğrudan kullan
      if (typeof initialValue === 'string') {
        setStoredValue(item as unknown as T);
      } else {
        setStoredValue(JSON.parse(item));
      }
    }
  }, [key]);

  const setValue = (value: T) => {
    // Save state
    setStoredValue(value);
    // Save to localStorage
    // Eğer Level tipindeyse JSON.stringify yerine doğrudan kullan
    if (typeof value === 'string') {
      window.localStorage.setItem(key, value as unknown as string);
    } else {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  };
  return [storedValue, setValue];
};

export default useLocalStorage;
