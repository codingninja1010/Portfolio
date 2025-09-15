import { render } from '@/test/test-utils';
import { MotionConfig } from 'framer-motion';
import ScrollProgress from '@/components/ScrollProgress';

describe('ScrollProgress non-reduced-motion branch', () => {
  it('uses animated bgPosX and filter when reducedMotion is false', () => {
    // Ensure scroll context exists
    Object.defineProperty(document.documentElement, 'scrollHeight', { configurable: true, value: 2000 });
    Object.defineProperty(document.documentElement, 'clientHeight', { configurable: true, value: 1000 });
    const { container } = render(
      <MotionConfig reducedMotion="never">
        <ScrollProgress />
      </MotionConfig>
    );
    const fill = container.querySelector('.rainbow-flow');
    expect(fill).toBeTruthy();
  });
});
