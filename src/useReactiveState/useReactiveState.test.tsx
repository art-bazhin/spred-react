import { useReactiveState } from './useReactiveState';
import { signal } from '@spred/core';
import { render, screen, act, getByTestId } from '@testing-library/react';

describe('useReactiveState', () => {
  it('subscribes to updates of the passed state object', () => {
    const str = 'foo';
    const counter = signal(0);
    const doubleCounter = signal((get) => get(counter) * 2);
    const increment = () => counter.set(counter.value + 1);

    function CounterApp() {
      const state = useReactiveState({
        str,
        counter,
        doubleCounter,
        increment,
      });

      return (
        <>
          <span data-testid="str">{state.str}</span>
          <span data-testid="counter1">{state.counter}</span>
          <span data-testid="counter2">{state.doubleCounter}</span>
        </>
      );
    }

    render(<CounterApp />);
    expect(screen.getByTestId('str').textContent).toBe('foo');
    expect(screen.getByTestId('counter1').textContent).toBe('0');
    expect(screen.getByTestId('counter2').textContent).toBe('0');

    act(increment);
    expect(screen.getByTestId('str').textContent).toBe('foo');
    expect(screen.getByTestId('counter1').textContent).toBe('1');
    expect(screen.getByTestId('counter2').textContent).toBe('2');
  });

  it('creates the state from the passed factory and subscribes to its updates', () => {
    function createState() {
      const str = 'foo';
      const counter = signal(0);
      const doubleCounter = signal((get) => get(counter) * 2);
      const increment = () => counter.set(counter.value + 1);

      return {
        str,
        counter,
        doubleCounter,
        increment,
      };
    }

    function CounterApp() {
      const state = useReactiveState(createState);

      return (
        <>
          <button data-testid="button" onClick={state.increment}></button>
          <span data-testid="str">{state.str}</span>
          <span data-testid="counter1">{state.counter}</span>
          <span data-testid="counter2">{state.doubleCounter}</span>
        </>
      );
    }

    render(<CounterApp />);
    expect(screen.getByTestId('str').textContent).toBe('foo');
    expect(screen.getByTestId('counter1').textContent).toBe('0');
    expect(screen.getByTestId('counter2').textContent).toBe('0');

    act(() => screen.getByTestId('button').click());
    expect(screen.getByTestId('str').textContent).toBe('foo');
    expect(screen.getByTestId('counter1').textContent).toBe('1');
    expect(screen.getByTestId('counter2').textContent).toBe('2');
  });
});
