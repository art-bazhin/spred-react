import { useEffect, useRef, useState, DependencyList } from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import { Signal, configure } from 'spred';

configure({
  _notificationWrapper: unstable_batchedUpdates,
} as any);

function getSignal<T>(signalOrFactory: Signal<T> | (() => Signal<T>)) {
  return (
    (signalOrFactory as any).subscribe ? signalOrFactory : signalOrFactory()
  ) as Signal<T>;
}

const increment = (n: number) => ++n;
const INIT: any = {};

export function useSignal<T>(
  signalFactory: () => Signal<T>,
  deps: DependencyList
): T;
export function useSignal<T>(signal: Signal<T>): T;

export function useSignal<T>(
  signalOrFactory: Signal<T> | (() => Signal<T>),
  dependencies?: DependencyList
) {
  const deps = dependencies || [signalOrFactory];
  const [rendered, trigger] = useState(0);
  const valueRef = useRef(INIT);
  const sub = (value: T) => {
    const shouldRender = valueRef.current !== INIT;
    valueRef.current = value;
    if (shouldRender) trigger(increment);
  };

  let unsub: () => any;

  if (valueRef.current === INIT) {
    unsub = getSignal(signalOrFactory).subscribe(sub);
  }

  useEffect(() => {
    if (rendered) {
      unsub = getSignal(signalOrFactory).subscribe(sub);
    }

    return unsub;
  }, deps);

  return valueRef.current;
}
