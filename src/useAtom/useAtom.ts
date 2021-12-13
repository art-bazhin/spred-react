import { useEffect, useRef, useState, DependencyList, useMemo } from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import { Atom, configure } from 'spred';

configure({
  _notificationWrapper: unstable_batchedUpdates,
} as any);

function getAtom<T>(atomOrFactory: Atom<T> | (() => Atom<T>)) {
  return (
    (atomOrFactory as any).subscribe ? atomOrFactory : atomOrFactory()
  ) as Atom<T>;
}

const noop = () => {};

export function useAtom<T>(
  atomFactory: () => Atom<T>,
  deps?: DependencyList
): T;
export function useAtom<T>(atom: Atom<T>, deps?: DependencyList): T;

export function useAtom<T>(
  atomOrFactory: Atom<T> | (() => Atom<T>),
  dependencies?: DependencyList
) {
  const deps = dependencies || [];

  const firstRenderRef = useRef(true);
  const unsubRef = useRef<() => void>();

  const atom = useMemo(() => getAtom(atomOrFactory), []);
  const atomRef = useRef(atom);

  let noopUnsub = noop;

  if (firstRenderRef.current) {
    noopUnsub = atomRef.current.subscribe(noop, false);
  }

  const [container, setContainer] = useState(() => ({
    value: atomRef.current(),
  }));

  useEffect(() => {
    const subscriber = (value: T) => setContainer({ value });

    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      unsubRef.current = atomRef.current.subscribe(subscriber, false);
      noopUnsub();
    } else {
      atomRef.current = getAtom(atomOrFactory);
      unsubRef.current = atomRef.current.subscribe(subscriber);
    }

    return unsubRef.current;
  }, deps);

  return container.value;
}
