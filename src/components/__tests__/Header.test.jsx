import { render, screen, fireEvent } from '@/test/test-utils';
import Header from '@/components/Header';
import { RESUME_URL } from '@/config/site';

jest.mock('@/components/ui/AnimatedDownloadButton', () => (props) => (
  <button data-testid="resume-btn" onClick={() => {}}>{props.children}</button>
));

describe('Header', () => {
  beforeEach(() => {
    // Reset body overflow which Header manipulates
    document.body.style.overflow = '';
  });

  it('renders nav items and resume button on desktop', () => {
    render(<Header />);
    const labels = ['Home','About','Skills','Experience','Volunteering','Projects','Achievements','Contact'];
    for (const label of labels) {
      expect(screen.getByRole('button', { name: label })).toBeInTheDocument();
    }
    if (RESUME_URL) {
      expect(screen.getByTestId('resume-btn')).toBeInTheDocument();
    }
  });

  it('toggles mobile menu and locks body scroll', () => {
    render(<Header />);
    const toggle = screen.getByRole('button', { name: /toggle navigation menu/i });
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(document.body.style.overflow).toBe('hidden');
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(document.body.style.overflow).toBe('');
  });
});
