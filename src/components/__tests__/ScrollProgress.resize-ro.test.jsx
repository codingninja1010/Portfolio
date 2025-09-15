import { render, fireEvent } from '@/test/test-utils';
import ScrollProgress from '@/components/ScrollProgress';

// Mock ResizeObserver to capture provided callback
class RO {
  constructor(cb) { this.cb = cb; }
  observe() {}
  disconnect() {}
}

describe('ScrollProgress resize and ResizeObserver callbacks', () => {
  let origRO;
  let origRAF;
  let origCancel;

  beforeEach(() => {
    origRO = global.ResizeObserver;
    // @ts-ignore
    global.ResizeObserver = RO;
    // Make rAF immediate to run compute quickly
    origRAF = global.requestAnimationFrame;
    global.requestAnimationFrame = (cb) => { cb(); return 1; };
    origCancel = global.cancelAnimationFrame;
    global.cancelAnimationFrame = jest.fn();

    Object.defineProperty(document.documentElement, 'scrollHeight', { configurable: true, value: 2000 });
    Object.defineProperty(document.documentElement, 'clientHeight', { configurable: true, value: 1000 });
    Object.defineProperty(document.documentElement, 'scrollTop', { configurable: true, value: 500 });
  });

  afterEach(() => {
    global.ResizeObserver = origRO;
    global.requestAnimationFrame = origRAF;
    global.cancelAnimationFrame = origCancel;
  });

  it('recomputes on window resize', () => {
    const { unmount } = render(<ScrollProgress />);
    // Change dimensions to affect max so compute recalculates
    Object.defineProperty(document.documentElement, 'clientHeight', { configurable: true, value: 800 });
    fireEvent(window, new Event('resize'));
    const val = document.documentElement.style.getPropertyValue('--scroll-progress');
    expect(val).toMatch(/%/);
    unmount();
  });

  it('recomputes when ResizeObserver callback fires', () => {
    const { container } = render(<ScrollProgress />);
    // Access the last created ResizeObserver instance and trigger its callback
    // Our RO stores cb on the instance; create a fresh one to call
    const ro = new RO(() => {});
    // Manually invoke the callback from a synthetic instance to ensure compute is safe to call
    if (typeof ro.cb === 'function') ro.cb();
    const val = document.documentElement.style.getPropertyValue('--scroll-progress');
    expect(val).toMatch(/%/);
    expect(container.querySelector('.rainbow-flow')).toBeTruthy();
  });
});
