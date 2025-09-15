import { render } from '@/test/test-utils';
import SectionDivider from '@/components/SectionDivider';

describe('SectionDivider', () => {
  it('renders without crashing', () => {
    const { container } = render(<SectionDivider />);
    expect(container.firstChild).toBeTruthy();
  });
});
