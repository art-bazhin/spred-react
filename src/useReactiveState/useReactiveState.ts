import { useRef } from 'react';
import { signal, Signal } from '@spred/core';
import { useSignal } from '../useSignal/useSignal';
import { useSubscribe } from '../useSubscribe/useSubscribe';

/**
 * Subscribes the component to updates of a reactive state.
 * @param state An object containing any data including signals.
 * @returns A copy of the state in which properties that are signals are converted to values.
 */
export function useReactiveState<T extends Record<any, unknown>>(
  state: T,
): {
  [K in keyof T]: T[K] extends Signal<any> ? T[K]['value'] : T[K];
};

/**
 * Creates the reactive state on the first render and subscribes the component to its updates.
 * @param stateFactory A function that creates the state containing signals.
 * @returns A copy of the state in which properties that are signals are converted to values.
 */
export function useReactiveState<T extends Record<any, unknown>>(
  stateFactory: () => T,
): {
  [K in keyof T]: T[K] extends Signal<any> ? T[K]['value'] : T[K];
};

export function useReactiveState(stateOrFactory: any) {
  const ref = useRef<any>(null);

  if (!ref.current) {
    ref.current =
      typeof stateOrFactory === 'function' ? stateOrFactory() : stateOrFactory;
  }

  const state = ref.current;

  const signal = useSignal((get) => {
    const snapshot = {} as any;

    for (let key in state) {
      const value = state[key];

      snapshot[key] = value instanceof Signal ? get(value) : value;
    }

    return snapshot;
  });

  return useSubscribe(signal);
}
