import { useEffect, useRef, useState, DependencyList, useMemo } from 'react';
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

const noop = () => {};

export function useSignal<T>(
  signalFactory: () => Signal<T>,
  deps?: DependencyList
): T;
export function useSignal<T>(signal: Signal<T>, deps?: DependencyList): T;

export function useSignal<T>(
  signalOrFactory: Signal<T> | (() => Signal<T>),
  dependencies?: DependencyList
) {
  const deps = dependencies || [];

  const firstRenderRef = useRef(true);
  const unsubRef = useRef<() => void>();

  const signal = useMemo(() => getSignal(signalOrFactory), []);
  const signalRef = useRef(signal);

  let noopUnsub = noop;

  if (firstRenderRef.current) {
    noopUnsub = signalRef.current.subscribe(noop, false);
  }

  const [container, setContainer] = useState(() => ({
    value: signalRef.current(),
  }));

  useEffect(() => {
    const subscriber = (value: T) => setContainer({ value });

    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      unsubRef.current = signalRef.current.subscribe(subscriber, false);
      noopUnsub();
    } else {
      signalRef.current = getSignal(signalOrFactory);
      unsubRef.current = signalRef.current.subscribe(subscriber);
    }

    return unsubRef.current;
  }, deps);

  return container.value;
}
