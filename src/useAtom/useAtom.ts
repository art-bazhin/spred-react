import { useEffect, useRef, useState, DependencyList } from 'react';
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

  const firstRender = useRef(true);
  const emitOnSubscribe = useRef(false);
  const atom = useRef(getAtom(atomOrFactory));
  const [value, setValue] = useState(atom.current);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      emitOnSubscribe.current = true;
      atom.current = getAtom(atomOrFactory);
    }

    return atom.current.subscribe(setValue, emitOnSubscribe.current);
  }, deps);

  return value;
}
