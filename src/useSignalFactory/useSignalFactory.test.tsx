import { useSignalFactory } from './useSignalFactory';
import { signal } from '@spred/core';
import { render, screen, act } from '@testing-library/react';
import { useSignal } from '../useSignal/useSignal';
import { memo } from 'react';

describe('useSignalFactory', () => {
  const counters = {
    1: signal(0),
    2: signal(0),
  };

  const counterId = signal<1 | 2>(1);

  const factory = (id: 1 | 2) => signal(() => counters[id].get());

  const Counter = memo((props: { id: 1 | 2 }) => {
    const value = useSignalFactory(factory, [props.id]);
    return <span data-testid={props.id}>{value}</span>;
  });

  const CounterApp = memo(() => {
    const id = useSignal(counterId);
    return <Counter id={id} />;
  });

  const text = signal('foo');
  const noArgsFactory = () => text;

  const Text = memo(() => {
    const value = useSignalFactory(noArgsFactory);
    return <span data-testid="text">{value}</span>;
  });

  it('creates a signal and gets its value on every update', () => {
    render(<Text />);
    expect(screen.getByTestId('text').textContent).toBe('foo');

    act(() => text.set('bar'));
    expect(screen.getByTestId('text').textContent).toBe('bar');
  });

  it('creates a signal with passed args and gets its value on every update', () => {
    render(<Counter id={1} />);
    expect(screen.getByTestId('1').textContent).toBe('0');

    act(() => counters[1].set(1));
    expect(screen.getByTestId('1').textContent).toBe('1');
  });

  it('creates new signal on args change', () => {
    render(<CounterApp />);
    expect(screen.getByTestId('1').textContent).toBe('1');

    act(() => counterId.set(2));
    expect(screen.getByTestId('2').textContent).toBe('0');

    act(() => counters[counterId.get()].set(1));
    expect(screen.getByTestId('2').textContent).toBe('1');
  });
});
