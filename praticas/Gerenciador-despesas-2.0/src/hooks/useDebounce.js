import { useEffect, useState } from 'react';

export default function useDebounce(value, delay = 400) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);

    // Cancela o timer anterior se o valor mudar antes do fim do atraso
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
