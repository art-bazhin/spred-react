import { useSignal } from './useSignal';
import { Signal, WritableSignal } from '@spred/core';
import { render, act } from '@testing-library/react';
import { useState } from 'react';

describe('useSignal', () => {
  it('creates writable signal and keeps it after rerender', () => {
    let forceRender: any;
    let lastCounter: any;

    function CounterApp() {
      const counter = useSignal(0);
      const [state, setState] = useState(0);

      forceRender = () => setState((v) => v + 1);

      expect(counter).toBeInstanceOf(WritableSignal);
      if (state) expect(lastCounter).toBe(counter);

      lastCounter = counter;
      return null;
    }

    render(<CounterApp />);
    act(forceRender);
    act(forceRender);
  });

  it('creates computed signal and keeps it after rerender', () => {
    let forceRender: any;
    let lastCounter: any;

    function CounterApp() {
      const counter = useSignal(0);
      const doubleCounter = useSignal((get) => get(counter) * 2);
      const [state, setState] = useState(0);

      forceRender = () => setState((v) => v + 1);

      expect(doubleCounter).toBeInstanceOf(Signal);
      if (state) expect(lastCounter).toBe(doubleCounter);

      lastCounter = doubleCounter;
      return null;
    }

    render(<CounterApp />);
    act(forceRender);
    act(forceRender);
  });
});
