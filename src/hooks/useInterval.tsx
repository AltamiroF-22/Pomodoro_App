import { useEffect, useRef } from "react";

export const useInterval = <C extends CallableFunction>(
  callback: C,
  delay: number | null
): void => {
  const savedCallback = useRef<C>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    const tick = () => {
      if (savedCallback.current) savedCallback.current();
    };
    
    if (delay !== null) {
      // eslint-disable-next-line prefer-const
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};
