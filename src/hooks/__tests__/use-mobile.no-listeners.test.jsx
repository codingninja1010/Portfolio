import { renderHook } from '@testing-library/react';
import { useIsMobile } from '@/hooks/use-mobile';

// Simulate environment where neither addEventListener nor addListener exists
function bareMatchMedia(matches) {
  return { matches };
}

describe('useIsMobile - no listener APIs present', () => {
  it('initializes and returns correct state without event subscription', () => {
    const original = window.matchMedia;
    // @ts-ignore
    window.matchMedia = () => bareMatchMedia(false);

    const originalWidth = window.innerWidth;
    // Start desktop
    // @ts-ignore
    window.innerWidth = 1200;
    const { result, unmount } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);

    // Switch to mobile width; without listeners, state won't update automatically
    // but hook should not throw on mount/cleanup and should coerce to boolean
    // @ts-ignore
    window.innerWidth = 500;
    expect(typeof result.current).toBe('boolean');

    // Ensure cleanup does not throw without remove APIs
    unmount();

    // restore
    // @ts-ignore
    window.innerWidth = originalWidth;
    window.matchMedia = original;
  });
});
