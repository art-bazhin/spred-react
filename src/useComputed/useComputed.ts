import { computed } from '@spred/core';
import { DependencyList, useMemo } from 'react';
import { useSignal } from '../useSignal/useSignal';

const EMPTY: DependencyList = [];

/**
 * Create a computed signal, memoize it and subscribe the component to its updates.
 * @param computation The function that calculates the created signal value.
 * @param dependendencies The list of variables referenced inside of the computation except other signals.
 * @returns The current value of the created signal.
 */
export function useComputed<T>(
  computation: () => T,
  dependendencies?: DependencyList,
) {
  const signal = useMemo(() => computed(computation), dependendencies || EMPTY);
  return useSignal(signal);
}
