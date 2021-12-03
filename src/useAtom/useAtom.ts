import { useEffect, useState } from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import { Atom, configure } from 'spred';

configure({
  _notificationWrapper: unstable_batchedUpdates,
} as any);

export function useAtom<T>(atomFactory: () => Atom<T>): T;
export function useAtom<T>(atom: Atom<T>): T;

export function useAtom<T>(atomOrFactory: any) {
  const [, forceRender] = useState<any>();
  const [storedAtom] = useState(atomOrFactory as any);

  const rerender = () => forceRender({});

  let atom = atomOrFactory.subscribe ? atomOrFactory : (storedAtom as Atom<T>);

  useEffect(() => atom.subscribe(rerender, false), [atom]);

  return atom.get();
}
