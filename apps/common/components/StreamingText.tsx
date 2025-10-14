// useTypewriter.ts
import { useEffect, useRef, useState } from 'react';

interface UseTypewriterOptions {
  fullText: string;
  speedMs?: number; // delay between characters
  startDelayMs?: number; // delay before typing starts
  loop?: boolean; // restart after finishing
  onDone?: () => void; // callback when finished one pass
}

/**
 * Typewriter effect for a single string of plain text.
 * Re-types when `fullText` changes.
 */
export function Typewriter(
  {
    fullText = '',
    speedMs = 30,
    startDelayMs = 0,
    loop = false,
    onDone,
  }: UseTypewriterOptions = { fullText: '' },
) {
  const [displayed, setDisplayed] = useState('');
  const indexRef = useRef(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    // Reset when input text changes
    setDisplayed('');
    indexRef.current = 0;

    const start = () => {
      const tick = () => {
        const i = indexRef.current;
        if (i < fullText.length) {
          setDisplayed((prev) => prev + fullText[i]);
          indexRef.current = i + 1;
          timerRef.current = window.setTimeout(tick, speedMs);
        } else {
          if (onDone) onDone();
          if (loop) {
            // small pause before looping
            timerRef.current = window.setTimeout(() => {
              setDisplayed('');
              indexRef.current = 0;
              tick();
            }, 800);
          }
        }
      };

      tick();
    };

    const startTimer = window.setTimeout(start, startDelayMs);
    return () => {
      window.clearTimeout(startTimer);
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [fullText, speedMs, startDelayMs, loop, onDone]);

  return displayed;
}
