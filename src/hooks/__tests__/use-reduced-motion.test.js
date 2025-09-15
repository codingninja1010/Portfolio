import { renderHook, act } from '@testing-library/react';
import { usePrefersReducedMotion } from '@/hooks/use-reduced-motion';

function mockMatchMedia(matches) {
  return {
    matches,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  };
}

describe('usePrefersReducedMotion', () => {
  it('returns true when prefers-reduced-motion is reduce', () => {
    const original = window.matchMedia;
    // @ts-ignore
    window.matchMedia = () => mockMatchMedia(true);

    const { result } = renderHook(() => usePrefersReducedMotion());
    expect(result.current).toBe(true);

    window.matchMedia = original;
  });

  it('updates when media query changes', () => {
    const listeners = { change: [] };
    const mql = {
      matches: false,
      addEventListener: (_, cb) => listeners.change.push(cb),
      removeEventListener: jest.fn(),
    };
    const original = window.matchMedia;
    // @ts-ignore
    window.matchMedia = () => mql;

    const { result } = renderHook(() => usePrefersReducedMotion());
    expect(result.current).toBe(false);

    // Flip and notify (wrap in act for React state updates)
    mql.matches = true;
    act(() => {
      listeners.change.forEach((cb) => cb());
    });
    expect(result.current).toBe(true);

    window.matchMedia = original;
  });
});
