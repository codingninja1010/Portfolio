import { render, screen, fireEvent } from '@/test/test-utils';
import Header from '@/components/Header';

// Helper to create a section so scrollToSection has a target
function addSection(id) {
  const el = document.createElement('div');
  el.id = id;
  // give it some size to make offset meaningful
  Object.defineProperty(el, 'getBoundingClientRect', { value: () => ({ top: 300, left: 0, width: 100, height: 100 }) });
  document.body.appendChild(el);
  return el;
}

describe('Header behaviors', () => {
  beforeEach(() => {
    document.documentElement.style.setProperty('--app-scroll-padding', '');
  });

  it('locks scroll when mobile menu opens and unlocks on close', () => {
    render(<Header />);
    const toggle = screen.getByRole('button', { name: /toggle navigation menu/i });

    fireEvent.click(toggle);
    expect(document.body.style.overflow).toBe('hidden');

    fireEvent.click(toggle);
    expect(document.body.style.overflow).toBe('');
  });

  it('updates CSS var for scroll padding and scrolls to sections with offset', () => {
    render(<Header />);

    // CSS var should be set after mount
    const val = document.documentElement.style.getPropertyValue('--app-scroll-padding');
    expect(val).toMatch(/px/);

    addSection('skills');
    const spy = jest.spyOn(window, 'scrollTo').mockImplementation(() => {});

    const btn = screen.getByRole('button', { name: /skills/i });
    fireEvent.click(btn);

    expect(spy).toHaveBeenCalledWith({ top: expect.any(Number), behavior: 'smooth' });
    spy.mockRestore();
  });

  it('adjusts for hash after mount', async () => {
    addSection('projects');
    // set a hash before render (jsdom allows setting hash directly)
    window.location.hash = '#projects';
    const scrollSpy = jest.spyOn(window, 'scrollTo').mockImplementation(() => {});

    render(<Header />);

    // adjustForHash uses setTimeout 0; wait a tick
    await new Promise((r) => setTimeout(r, 0));
    expect(scrollSpy).toHaveBeenCalledWith({ top: expect.any(Number) });
    scrollSpy.mockRestore();
  });
});
