import { Signal } from '@spred/core';
import { useCallback, useSyncExternalStore } from 'react';

/**
 * Get the current value of a signal and subscribe the component to its updates.
 * @param signal A signal to subscribe to.
 * @returns The current value of the signal.
 */
export function useSignal<T>(signal: Signal<T>): T {
  const subscribe = useCallback((cb: any) => signal.subscribe(cb), [signal]);
  const getSnapshot = useCallback(() => signal.get(false), [signal]);

  return useSyncExternalStore(subscribe, getSnapshot);
}
