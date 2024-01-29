import { useComputed } from './useComputed';
import { signal } from '@spred/core';
import { render, screen, act } from '@testing-library/react';
import { useSignal } from '../useSignal/useSignal';

describe('useSignal', () => {
  const counters = {
    1: signal(0),
    2: signal(0),
  };

  const counterId = signal<1 | 2>(1);

  function Counter(props: { id: number }) {
    const value = useComputed(() => counters[counterId.get()].get());
    return <span data-testid={props.id}>{value}</span>;
  }

  function CounterApp() {
    const id = useSignal(counterId);
    return <Counter id={id} />;
  }

  it('gets value of created computed signal on every update', () => {
    render(<Counter id={1} />);
    expect(screen.getByTestId('1').textContent).toBe('0');

    act(() => counters[1].set(1));
    expect(screen.getByTestId('1').textContent).toBe('1');
  });

  it('creates new computed signal on dependency change', () => {
    render(<CounterApp />);
    expect(screen.getByTestId('1').textContent).toBe('1');

    act(() => counterId.set(2));
    expect(screen.getByTestId('2').textContent).toBe('0');

    act(() => counters[counterId.get()].set(1));
    expect(screen.getByTestId('2').textContent).toBe('1');
  });
});
