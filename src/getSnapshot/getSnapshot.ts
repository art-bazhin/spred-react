import { Signal } from '@spred/core';

export type Reactive<T> = {
  [K in keyof T]: Signal<T[K]>;
};

/**
 * Creates a snapshot of an object with reactive properties.
 * @param state An object with properties that are signals.
 * @returns An object with current values of state properties.
 */
export function getSnapshot<T>(state: Reactive<T>) {
  const result = {} as T;

  for (let key in state) result[key] = state[key].get();
  return result;
}
