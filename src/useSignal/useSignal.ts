import { DependencyList, useMemo } from 'react';
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
  deps?: DependencyList
): T;

export function useSignal<T>(signal: Signal<T>): T;

export function useSignal<T>(
  signalOrFactory: Signal<T> | (() => Signal<T>),
  dependencies?: DependencyList
) {
  const deps =
    arguments.length === 1 ? [signalOrFactory] : dependencies || EMPTY;

  const args: [(cb: any) => () => any, () => T] = useMemo(() => {
    const signal = getSignal(signalOrFactory);
    return [(cb: any) => signal.subscribe(cb, false), () => signal.sample()];
  }, deps);

  return useSyncExternalStore(...args);
}
