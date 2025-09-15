import { render, screen, fireEvent } from '@/test/test-utils';
import { MotionConfig } from 'framer-motion';
import ScrollToTop from '@/components/ScrollToTop';

// Polyfill ResizeObserver if missing (jest setup may already do this)
class RO {
  observe() {}
  disconnect() {}
}

describe('ScrollToTop', () => {
  beforeAll(() => {
    if (!('ResizeObserver' in global)) {
      // @ts-ignore
      global.ResizeObserver = RO;
    }
  });

  it('shows button after scrolling and scrolls to top on click', async () => {
    // Ensure a scrollable document
    Object.defineProperty(document.documentElement, 'scrollHeight', { configurable: true, value: 2000 });
    Object.defineProperty(document.documentElement, 'clientHeight', { configurable: true, value: 800 });

  render(<ScrollToTop />);

    // Simulate scroll near bottom
    Object.defineProperty(document.scrollingElement || document.documentElement, 'scrollTop', { configurable: true, value: 500 });
  fireEvent.scroll(window);
  // allow rAF cycle to run effect
  await new Promise((r) => setTimeout(r, 0));

  const btn = screen.getByRole('button', { name: /scroll to top/i, hidden: true });
    expect(btn).toBeInTheDocument();

    const scrollSpy = jest.spyOn(window, 'scrollTo').mockImplementation(() => {});
    fireEvent.click(btn);
    expect(scrollSpy).toHaveBeenCalledWith({ top: 0, behavior: expect.any(String) });
    scrollSpy.mockRestore();
  });

  it('becomes visible on long pages due to ratio threshold', async () => {
    // Long page where ratio > 0.08 triggers visibility even at small scroll
    Object.defineProperty(document.documentElement, 'scrollHeight', { configurable: true, value: 10000 });
    Object.defineProperty(document.documentElement, 'clientHeight', { configurable: true, value: 800 });
    const scrollEl = document.scrollingElement || document.documentElement;
    Object.defineProperty(scrollEl, 'scrollTop', { configurable: true, value: 900 }); // ~10%

    render(<ScrollToTop />);
    fireEvent.scroll(window);
    await new Promise((r) => setTimeout(r, 0));

    const btn = screen.getByRole('button', { name: /scroll to top/i, hidden: true });
    expect(btn).toBeInTheDocument();
  });

  it('uses auto behavior when reduced motion is preferred', async () => {
    // Force prefers-reduced-motion media query to match
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: /prefers-reduced-motion\s*:\s*reduce/.test(query),
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    Object.defineProperty(document.documentElement, 'scrollHeight', { configurable: true, value: 2000 });
    Object.defineProperty(document.documentElement, 'clientHeight', { configurable: true, value: 800 });
    const scrollEl = document.scrollingElement || document.documentElement;
    Object.defineProperty(scrollEl, 'scrollTop', { configurable: true, value: 500 });

    const { container } = render(
      <MotionConfig reducedMotion="always">
        <ScrollToTop />
      </MotionConfig>
    );
    fireEvent.scroll(window);
    await new Promise((r) => setTimeout(r, 0));
    const btn = screen.getByRole('button', { name: /scroll to top/i, hidden: true });

    const spy = jest.spyOn(window, 'scrollTo').mockImplementation(() => {});
    fireEvent.click(btn);
    expect(spy).toHaveBeenCalledWith({ top: 0, behavior: 'auto' });
    spy.mockRestore();

    // restore
    window.matchMedia = originalMatchMedia;
  });

  it('cleans up listeners and cancels rAF on unmount', async () => {
    Object.defineProperty(document.documentElement, 'scrollHeight', { configurable: true, value: 2000 });
    Object.defineProperty(document.documentElement, 'clientHeight', { configurable: true, value: 800 });
    const scrollEl = document.scrollingElement || document.documentElement;
    Object.defineProperty(scrollEl, 'scrollTop', { configurable: true, value: 400 });

    const cancelSpy = jest.spyOn(window, 'cancelAnimationFrame');
    const roDisconnect = jest.fn();
    const RO = class { observe() {} disconnect() { roDisconnect(); } };
    // @ts-ignore
    const prevRO = global.ResizeObserver;
    // @ts-ignore
    global.ResizeObserver = RO;

    const { unmount } = render(<ScrollToTop />);
    fireEvent.scroll(window);
    await new Promise((r) => setTimeout(r, 0));
    unmount();

    expect(cancelSpy).toHaveBeenCalled();
    expect(roDisconnect).toHaveBeenCalled();
    // @ts-ignore
    global.ResizeObserver = prevRO;
  });
});
