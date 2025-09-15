import { render, fireEvent } from '@/test/test-utils';
import ScrollProgress from '@/components/ScrollProgress';

class RO { observe() {} disconnect() {} }

describe('ScrollProgress', () => {
  beforeAll(() => {
    if (!('ResizeObserver' in global)) {
      // @ts-ignore
      global.ResizeObserver = RO;
    }
  });

  it('updates CSS var on scroll', async () => {
    jest.useFakeTimers();
    Object.defineProperty(document.documentElement, 'scrollHeight', { configurable: true, value: 2000 });
    Object.defineProperty(document.documentElement, 'clientHeight', { configurable: true, value: 1000 });

    render(<ScrollProgress />);

    Object.defineProperty(document.documentElement, 'scrollTop', { configurable: true, value: 500 });
    fireEvent.scroll(window);
    // Advance rAF queued compute
    jest.runOnlyPendingTimers();

    expect(document.documentElement.style.getPropertyValue('--scroll-progress')).toBe('50%');
    jest.useRealTimers();
  });
});
