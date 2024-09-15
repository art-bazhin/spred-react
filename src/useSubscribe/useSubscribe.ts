import { useRef, useSyncExternalStore } from 'react';
import { Signal } from '@spred/core';

/**
 * Gets the current value of a signal and subscribes the component to its updates.
 * @param signal A signal to subscribe to.
 * @returns The current value of the signal.
 */
export function useSubscribe<T>(signal: Signal<T>): T {
  const ref = useRef<{
    signal: Signal<T>;
    subscribe: (cb: (value: T) => void) => () => void;
    getSnapshot: () => T;
  }>({
    signal: null as any,
    subscribe: null as any,
    getSnapshot: null as any,
  });

  const cache = ref.current;

  if (cache.signal !== signal) {
    cache.signal = signal;
    cache.subscribe = (cb: any) => signal.subscribe(cb);
    cache.getSnapshot = () => signal.value;
  }

  return useSyncExternalStore(
    cache.subscribe,
    cache.getSnapshot,
    cache.getSnapshot,
  );
}
