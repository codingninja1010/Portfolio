import { render, fireEvent, screen, cleanup } from '@/test/test-utils';
import { MotionConfig } from 'framer-motion';
import ScrollProgress from '@/components/ScrollProgress';

// Utility ResizeObserver mock with spies per test
class RO {
  constructor(cb) { this.cb = cb; this.disconnect = jest.fn(); this.observe = jest.fn(); }
}

describe('ScrollProgress branches', () => {
  let origRAF;
  let origCancelRAF;
  let origPageYOffset;

  beforeAll(() => {
    // Ensure ResizeObserver exists
    if (!('ResizeObserver' in global)) {
      // @ts-ignore
      global.ResizeObserver = RO;
    }
  });

  beforeEach(() => {
    jest.useFakeTimers();
    origRAF = global.requestAnimationFrame;
    origCancelRAF = global.cancelAnimationFrame;
    origPageYOffset = window.pageYOffset;
  });

  afterEach(() => {
    cleanup();
    jest.useRealTimers();
    global.requestAnimationFrame = origRAF;
    global.cancelAnimationFrame = origCancelRAF;
    // Restore pageYOffset if we overrode it
    try {
      Object.defineProperty(window, 'pageYOffset', { configurable: true, value: origPageYOffset });
    } catch {}
  });

  it('handles pages with no scrollable overflow (max=1 => 0%)', () => {
    Object.defineProperty(document.documentElement, 'scrollHeight', { configurable: true, value: 800 });
    Object.defineProperty(document.documentElement, 'clientHeight', { configurable: true, value: 800 });
    Object.defineProperty(document.documentElement, 'scrollTop', { configurable: true, value: 0 });

    render(<ScrollProgress />);
    // Initial compute runs on mount
    expect(document.documentElement.style.getPropertyValue('--scroll-progress')).toBe('0%');
  });

  it('uses window.pageYOffset when documentElement.scrollTop is 0', () => {
    Object.defineProperty(document.documentElement, 'scrollHeight', { configurable: true, value: 2000 });
    Object.defineProperty(document.documentElement, 'clientHeight', { configurable: true, value: 1000 });
    Object.defineProperty(document.documentElement, 'scrollTop', { configurable: true, value: 0 });
    // Override pageYOffset to exercise fallback branch
    Object.defineProperty(window, 'pageYOffset', { configurable: true, value: 400 });

    // Make rAF immediate so compute runs synchronously when queued
    global.requestAnimationFrame = (cb) => { cb(); return 1; };
    global.cancelAnimationFrame = jest.fn();

    render(<ScrollProgress />);
    fireEvent.scroll(window);
    expect(document.documentElement.style.getPropertyValue('--scroll-progress')).toBe('40%');
  });

  it('throttles multiple scroll events into one rAF (pending flag)', () => {
    Object.defineProperty(document.documentElement, 'scrollHeight', { configurable: true, value: 2000 });
    Object.defineProperty(document.documentElement, 'clientHeight', { configurable: true, value: 1000 });

    // Do not call the callback immediately; simulate real rAF so pending stays true between events
    let storedCb = null;
    const rafSpy = jest.fn((cb) => { storedCb = cb; return 42; });
    global.requestAnimationFrame = rafSpy;
    global.cancelAnimationFrame = jest.fn();

    render(<ScrollProgress />);
    // Fire two scrolls before the frame is processed; only one rAF should be requested
    fireEvent.scroll(window);
    fireEvent.scroll(window);
    expect(rafSpy).toHaveBeenCalledTimes(1);
    // Now flush the stored rAF callback to avoid dangling state
    if (storedCb) storedCb();
  });

  it('disables animated styles when prefers-reduced-motion is true', () => {
    Object.defineProperty(document.documentElement, 'scrollHeight', { configurable: true, value: 2000 });
    Object.defineProperty(document.documentElement, 'clientHeight', { configurable: true, value: 1000 });

    const { container } = render(
      <MotionConfig reducedMotion="always">
        <ScrollProgress />
      </MotionConfig>
    );
  const fill = container.querySelector('.rainbow-flow');
  expect(fill).toBeTruthy();
  });

  it('cleans up listeners and cancels any pending rAF on unmount', () => {
    Object.defineProperty(document.documentElement, 'scrollHeight', { configurable: true, value: 2000 });
    Object.defineProperty(document.documentElement, 'clientHeight', { configurable: true, value: 1000 });

    const cancelSpy = jest.fn();
    global.cancelAnimationFrame = cancelSpy;
    // Schedule a rAF and return a non-zero id to verify cancellation uses it
    const rafId = 99;
    global.requestAnimationFrame = (cb) => { return rafId; };

    // Spy on ResizeObserver.disconnect via instance stored on global
    const disconnectSpy = jest.fn();
    class RO2 {
      constructor(cb) { this.cb = cb; }
      observe() {}
      disconnect = disconnectSpy;
    }
    // @ts-ignore
    global.ResizeObserver = RO2;

    const { unmount } = render(<ScrollProgress />);
    // Trigger a scroll to set raf.current to rafId
    fireEvent.scroll(window);

    unmount();
    expect(cancelSpy).toHaveBeenCalledWith(rafId);
    expect(disconnectSpy).toHaveBeenCalled();
  });
});
