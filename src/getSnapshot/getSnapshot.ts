import { Signal } from '@spred/core';

export type Reactive<T> = {
  [K in keyof T]: Signal<T[K]>;
};

export function getSnapshot<T>(state: Reactive<T>) {
  const result = {} as T;

  for (let key in state) result[key] = state[key].get();
  return result;
}
