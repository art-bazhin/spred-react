import { computed } from '@spred/core';
import { DependencyList, useMemo } from 'react';
import { useSignal } from '../useSignal/useSignal';

const EMPTY: DependencyList = [];

export function useComputed<T>(
  computation: () => T,
  dependendencies?: DependencyList,
) {
  const signal = useMemo(() => computed(computation), dependendencies || EMPTY);
  return useSignal(signal);
}
