import { renderHook, act } from '@testing-library/react';
import { useIsMobile } from '@/hooks/use-mobile';

// Simulate older browsers where MediaQueryList uses addListener/removeListener
function legacyMatchMedia(matches) {
  let listener = null;
  return {
    matches,
    addListener: (cb) => { listener = cb; },
    removeListener: (cb) => { if (listener === cb) listener = null; },
    // For our hook, it doesn't pass the mql to onChange, so we just trigger
    trigger: (m) => { if (listener) listener({ matches: m }); },
  };
}

describe('useIsMobile - legacy listener API', () => {
  it('subscribes via addListener/removeListener when addEventListener is unavailable', () => {
    const mql = legacyMatchMedia(false);
    const original = window.matchMedia;
    // @ts-ignore
    window.matchMedia = () => mql;

    const originalWidth = window.innerWidth;
    // Start desktop
    // @ts-ignore
    window.innerWidth = 1200;
    const { result, unmount } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);

    // Change to mobile
    act(() => {
      // @ts-ignore
      window.innerWidth = 500;
      mql.trigger(true);
    });
    expect(result.current).toBe(true);

    // Unmount should call removeListener via cleanup; just ensure it does not throw
    unmount();

    // restore
    // @ts-ignore
    window.innerWidth = originalWidth;
    window.matchMedia = original;
  });
});
