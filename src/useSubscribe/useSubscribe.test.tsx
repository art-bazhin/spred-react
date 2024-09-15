import { useSubscribe } from './useSubscribe';
import { Signal, signal } from '@spred/core';
import { render, screen, act } from '@testing-library/react';

describe('useSubscribe', () => {
  const counter = signal(0);
  const doubleCounter = signal((get) => get(counter) * 2);

  function CounterApp() {
    const value = useSubscribe(counter);
    const doubleValue = useSubscribe(doubleCounter);

    return (
      <>
        <span data-testid="counter1">{value}</span>
        <span data-testid="counter2">{doubleValue}</span>
      </>
    );
  }

  function PropCounter(props: { signal: Signal<number> }) {
    const value = useSubscribe(props.signal);

    return (
      <>
        <span data-testid="counter1">{value}</span>
      </>
    );
  }

  const toggle = signal(false);
  const counter1 = signal(0);
  const counter2 = signal(100);

  function PropCounterApp() {
    const toggleValue = useSubscribe(toggle);
    const selected = toggleValue ? counter2 : counter1;

    return <PropCounter signal={selected} />;
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

  it('resubscribes if the signal was changed', () => {
    render(<PropCounterApp />);
    expect(screen.getByTestId('counter1').textContent).toBe('0');

    act(() => counter1.set(1));
    expect(screen.getByTestId('counter1').textContent).toBe('1');

    act(() => toggle.set(true));
    expect(screen.getByTestId('counter1').textContent).toBe('100');

    act(() => counter2.set(101));
    expect(screen.getByTestId('counter1').textContent).toBe('101');
  });
});
