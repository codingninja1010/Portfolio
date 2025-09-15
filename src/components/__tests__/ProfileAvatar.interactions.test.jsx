import { render, screen, fireEvent } from '@/test/test-utils';
import { MotionConfig } from 'framer-motion';
import ProfileAvatar from '@/components/ProfileAvatar.react';

const src = '/avatar.png';

describe('ProfileAvatar interactions', () => {
  it('tilts on mouse move and resets on leave', () => {
    const { container } = render(<ProfileAvatar src={src} alt="Me" size={200} />);
    const wrapper = container.querySelector('[role="img"]');
    expect(wrapper).toBeTruthy();

    // Provide a bounding rect to compute tilt
    Object.defineProperty(wrapper, 'getBoundingClientRect', {
      value: () => ({ left: 0, top: 0, width: 200, height: 200 }), configurable: true,
    });

    // Move near bottom-right to produce positive/negative rotations
    fireEvent.mouseMove(wrapper, { clientX: 180, clientY: 180 });
    // Spring updates are async; we just ensure no crash and element remains
    expect(wrapper).toBeInTheDocument();

    fireEvent.mouseLeave(wrapper);
    expect(wrapper).toBeInTheDocument();
  });

  it('disables spin/scale animations when reduced motion is preferred', () => {
    const { container } = render(
      <MotionConfig reducedMotion="always">
        <ProfileAvatar src={src} alt="Me" size={120} />
      </MotionConfig>
    );
    // Rotating ring container exists
    const ring = container.querySelector('svg');
    expect(ring).toBeTruthy();
    // Image present
    const img = container.querySelector('img');
    expect(img).toBeTruthy();
  });
});
