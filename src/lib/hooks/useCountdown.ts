'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Cuenta regresiva en segundos. Llama `onEnd` una sola vez al llegar a 0.
 * `running = false` congela el reloj.
 */
export function useCountdown(seconds: number, onEnd: () => void, running = true) {
  const [left, setLeft] = useState(seconds);
  const onEndRef = useRef(onEnd);
  useEffect(() => {
    onEndRef.current = onEnd;
  }, [onEnd]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setLeft(l => Math.max(0, l - 1)), 1000);
    return () => clearInterval(id);
  }, [running]);

  const fired = useRef(false);
  useEffect(() => {
    if (left === 0 && running && !fired.current) {
      fired.current = true;
      onEndRef.current();
    }
  }, [left, running]);

  return left;
}
