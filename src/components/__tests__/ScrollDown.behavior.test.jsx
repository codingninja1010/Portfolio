import { render, screen, fireEvent } from '@/test/test-utils';
import ScrollDown from '@/components/ScrollDown';

describe('ScrollDown behavior', () => {
  beforeEach(() => {
    // jsdom provides scrollTo but we'll spy to ensure it gets called
    window.scrollTo = jest.fn();
  });

  it('scrolls smoothly when #about is missing', () => {
    render(<ScrollDown />);
    const btn = screen.getByRole('button', { name: /scroll down to about/i });
    fireEvent.click(btn);
    expect(window.scrollTo).toHaveBeenCalled();
    const arg = window.scrollTo.mock.calls[0][0];
    expect(arg.behavior).toBe('smooth');
  });

  it('uses scrollIntoView when #about is present', () => {
    const about = document.createElement('div');
    about.id = 'about';
    about.scrollIntoView = jest.fn();
    document.body.appendChild(about);

    render(<ScrollDown />);
    const btn = screen.getByRole('button', { name: /scroll down to about/i });
    fireEvent.click(btn);
    expect(about.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
  });
});
