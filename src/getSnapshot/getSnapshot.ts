import { Signal, isSignal } from '@spred/core';

type Snapshot<T extends Record<any, unknown>> = {
  [K in keyof T]: T[K] extends Signal<any> ? ReturnType<T[K]['get']> : T[K];
};

/**
 * Creates an object containing the current values of the source object signal properties. Values of non-signal properties are copied.
 * @param state A source object.
 * @returns Source object snapshot.
 */
export function getSnapshot<T extends Record<any, unknown>>(state: T) {
  const result = {} as Snapshot<T>;

  for (let key in state) {
    const value = state[key];
    (result[key] as any) = isSignal(value) ? value.get() : value;
  }

  return result;
}
