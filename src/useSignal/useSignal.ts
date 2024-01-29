import { Signal } from '@spred/core';
import { useCallback, useSyncExternalStore } from 'react';

export function useSignal<T>(signal: Signal<T>): T {
  const subscribe = useCallback((cb: any) => signal.subscribe(cb), [signal]);
  const getSnapshot = useCallback(() => signal.get(false), [signal]);

  return useSyncExternalStore(subscribe, getSnapshot);
}
