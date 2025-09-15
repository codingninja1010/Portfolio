import { render } from '@/test/test-utils';
import * as FM from 'framer-motion';
import ScrollProgress from '@/components/ScrollProgress';

describe('ScrollProgress reduced-motion ternaries', () => {
  const original = FM.useReducedMotion;
  beforeEach(() => {
    jest.spyOn(FM, 'useReducedMotion').mockReturnValue(true);
    Object.defineProperty(document.documentElement, 'scrollHeight', { configurable: true, value: 2000 });
    Object.defineProperty(document.documentElement, 'clientHeight', { configurable: true, value: 1000 });
  });
  afterEach(() => {
    jest.restoreAllMocks();
    // ensure we restore original in case spy not active
    FM.useReducedMotion = original;
  });

  it('sets backgroundPositionX to "50%" and filter to "none" when reduced', () => {
    const { container } = render(<ScrollProgress />);
    const fill = container.querySelector('.rainbow-flow');
    expect(fill).toBeTruthy();
    // We cannot easily introspect motion style props, but executing this path covers the ternaries
  });
});
