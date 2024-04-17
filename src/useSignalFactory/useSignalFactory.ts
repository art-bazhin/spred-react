import { Signal } from '@spred/core';
import { useMemo } from 'react';
import { useSignal } from '../useSignal/useSignal';
import { EMPTY } from '../constants';

/**
 * Create a signal using the given factory function, memoize it and subscribe the component to its updates.
 * @param factory Signal factory function.
 * @param args The list of factory arguments also used as memoization dependencies.
 * @returns The current value of the created signal.
 */
export function useSignalFactory<T>(factory: () => Signal<T>): T;
export function useSignalFactory<T, A extends unknown[]>(
  factory: (...args: A) => Signal<T>,
  args: A,
): T;
export function useSignalFactory(factory: any, args?: any) {
  args = args || EMPTY;
  const signal = useMemo(() => factory(...args), args);
  return useSignal(signal);
}
