import { signal } from '@spred/core';
import { getSnapshot } from './getSnapshot';

describe('getSnapshot function', () => {
  it('returns the snapshot of an object containing signal properties', () => {
    const a = signal(0);
    const b = signal(() => a.get() * 2);

    const input = { a, b };

    expect(getSnapshot(input).a).toBe(0);
    expect(getSnapshot(input).b).toBe(0);

    a.set(1);
    expect(getSnapshot(input).a).toBe(1);
    expect(getSnapshot(input).b).toBe(2);
  });

  it('copies non-signal properties', () => {
    const a = signal(0);
    const b = signal(() => a.get() * 2);
    const fn = () => {};
    const value = 1;

    const input = { a, b, fn, value };

    expect(getSnapshot(input).a).toBe(0);
    expect(getSnapshot(input).b).toBe(0);

    a.set(1);
    expect(getSnapshot(input).a).toBe(1);
    expect(getSnapshot(input).b).toBe(2);

    expect(getSnapshot(input).fn).toBe(fn);
    expect(getSnapshot(input).value).toBe(value);
  });
});
