import { useComputation } from './useComputation';
import { signal } from '@spred/core';
import { render, screen, act } from '@testing-library/react';
import { useSignal } from '../useSignal/useSignal';
import { memo } from 'react';

describe('useComputation', () => {
  const counters = {
    1: signal(0),
    2: signal(0),
  };

  const counterId = signal<1 | 2>(1);

  beforeEach(() => {
    counterId.set(1);
  });

  const Counter = memo((props: { id: 1 | 2 }) => {
    const value = useComputation(() => counters[props.id].get(), [props.id]);
    return <span data-testid={props.id}>{value}</span>;
  });

  const CounterWithoutDeps = memo((props: { id: 1 | 2 }) => {
    const value = useComputation(() => counters[props.id].get());
    return <span data-testid={props.id}>{value}</span>;
  });

  const CounterApp = memo(() => {
    const id = useSignal(counterId);
    return <Counter id={id} />;
  });

  const CounterAppWithoutDeps = memo(() => {
    const id = useSignal(counterId);
    return <CounterWithoutDeps id={id} />;
  });

  it('gets value of created computed signal on every update', () => {
    render(<Counter id={1} />);
    expect(screen.getByTestId('1').textContent).toBe('0');

    act(() => counters[1].set(1));
    expect(screen.getByTestId('1').textContent).toBe('1');
  });

  it('creates new computed signal on dependency change if dependencies were passed', () => {
    render(<CounterApp />);
    expect(screen.getByTestId('1').textContent).toBe('1');

    act(() => counterId.set(2));
    expect(screen.getByTestId('2').textContent).toBe('0');

    act(() => counters[counterId.get()].set(1));
    expect(screen.getByTestId('2').textContent).toBe('1');
  });

  it('does not create new computed signal on dependency change if dependencies were not passed', () => {
    render(<CounterAppWithoutDeps />);
    expect(screen.getByTestId('1').textContent).toBe('1');

    act(() => counterId.set(2));
    expect(screen.getByTestId('2').textContent).toBe('1');
  });
});
