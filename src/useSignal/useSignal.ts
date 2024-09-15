import { useRef } from 'react';
import {
  Computation,
  signal,
  Signal,
  SignalOptions,
  WritableSignal,
} from '@spred/core';

/**
 * Сreates a signal that automatically calculates its value based on other
 * signals at the first render of the component and stores it in a ref.
 * @param compute A function that calculates the signal value and returns it.
 * @param options Signal options.
 * @returns A computed signal.
 */
export function useSignal<T>(
  compute: Computation<T>,
  options?: SignalOptions<T>,
): Signal<T>;

/**
 * Сreates a writable signal on the first render of the component and stores it in a ref.
 * @returns A writable signal.
 */
export function useSignal<T>(): WritableSignal<T | undefined>;

/**
 * Сreates a writable signal on the first render of the component and stores it in a ref.
 * @param value An initial value of the signal.
 * @param options Signal options.
 * @returns A writable signal.
 */
export function useSignal<T>(
  value: Exclude<T, Function>,
  options?: SignalOptions<T>,
): WritableSignal<T>;

export function useSignal(value?: any, options?: any): any {
  const ref = useRef<any>(null);

  if (!ref.current) ref.current = signal(value, options);

  return ref.current;
}
