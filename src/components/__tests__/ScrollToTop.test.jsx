import { render, screen, fireEvent } from '@/test/test-utils';
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
});
