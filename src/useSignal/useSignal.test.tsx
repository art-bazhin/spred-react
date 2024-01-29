import { useSignal } from './useSignal';
import { signal } from '@spred/core';
import { render, screen, act } from '@testing-library/react';

describe('useSignal', () => {
  const counter = signal(0);
  const doubleCounter = signal(() => counter.get() * 2);

  function CounterApp() {
    const value = useSignal(counter);
    const doubleValue = useSignal(doubleCounter);

    return (
      <>
        <span data-testid="counter1">{value}</span>
        <span data-testid="counter2">{doubleValue}</span>
      </>
    );
  }

  it('gets value of writable signal on every update', () => {
    render(<CounterApp />);
    expect(screen.getByTestId('counter1').textContent).toBe('0');

    act(() => counter.set(1));
    expect(screen.getByTestId('counter1').textContent).toBe('1');
  });

  it('gets value of computed signal on every update', () => {
    render(<CounterApp />);
    expect(screen.getByTestId('counter2').textContent).toBe('2');

    act(() => counter.set(2));
    expect(screen.getByTestId('counter2').textContent).toBe('4');
  });
});
