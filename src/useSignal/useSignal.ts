import { DependencyList, useMemo, useCallback } from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import { isSignal, Signal, configure } from 'spred';
import { useSyncExternalStore } from 'use-sync-external-store/shim';

configure({
  _notificationWrapper: unstable_batchedUpdates,
} as any);

function getSignal<T>(signalOrFactory: Signal<T> | (() => Signal<T>)) {
  return (
    isSignal(signalOrFactory) ? signalOrFactory : signalOrFactory()
  ) as Signal<T>;
}

const EMPTY: DependencyList = [];

export function useSignal<T>(
  signalFactory: () => Signal<T>,
  deps: DependencyList
): T;
export function useSignal<T>(signal: Signal<T>): T;

export function useSignal<T>(
  signalOrFactory: Signal<T> | (() => Signal<T>),
  dependencies?: DependencyList
) {
  const deps =
    arguments.length === 1 ? [signalOrFactory] : dependencies || EMPTY;
  const signal = useMemo(() => getSignal(signalOrFactory), deps);
  const subscribe = useCallback((cb) => signal.subscribe(cb), deps);
  const getSnapshot = useCallback(() => signal.sample(), deps);
  const value = useSyncExternalStore(subscribe, getSnapshot);

  return value;
}
