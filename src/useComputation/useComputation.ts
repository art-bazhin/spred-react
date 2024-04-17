import { computed } from '@spred/core';
import { DependencyList } from 'react';
import { useSignalFactory } from '../useSignalFactory/useSignalFactory';
import { EMPTY } from '../constants';

/**
 * Create a computed signal, memoize it and subscribe the component to its updates.
 * @param computation The function that calculates the created signal value.
 * @param dependendencies The list of variables referenced inside of the computation except other signals.
 * @returns The current value of the created signal.
 */
export function useComputation<T>(
  computation: () => T,
  dependendencies?: DependencyList,
) {
  return useSignalFactory(
    () => computed(computation),
    (dependendencies || EMPTY) as any,
  );
}
