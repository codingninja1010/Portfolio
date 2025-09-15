import { renderHook, act } from '@testing-library/react';
import { useIsMobile } from '@/hooks/use-mobile';

function mockMatchMedia(matches) {
  let listener = null;
  return {
    matches,
    addEventListener: (_, cb) => { listener = cb; },
    removeEventListener: () => { listener = null; },
    trigger: (m) => { if (listener) listener({ matches: m }); },
  };
}

describe('useIsMobile', () => {
  it('reflects viewport changes', () => {
    const mql = mockMatchMedia(false);
    const original = window.matchMedia;
    // @ts-ignore
    window.matchMedia = () => mql;

    // start desktop
    const originalWidth = window.innerWidth;
    // @ts-ignore
    window.innerWidth = 1200;
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);

    // change to mobile: update innerWidth then trigger the listener
    act(() => {
      // @ts-ignore
      window.innerWidth = 500;
      mql.trigger(true);
    });
    expect(result.current).toBe(true);

    // restore
    // @ts-ignore
    window.innerWidth = originalWidth;

    window.matchMedia = original;
  });
});
