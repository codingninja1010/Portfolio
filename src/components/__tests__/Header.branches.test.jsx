import { render, screen, fireEvent, waitFor } from '@/test/test-utils';
import Header from '@/components/Header';

// Utility to create a target section element
function createSection(id, top = 300) {
  const el = document.createElement('div');
  el.id = id;
  Object.defineProperty(el, 'getBoundingClientRect', {
    value: () => ({ top, left: 0, width: 100, height: 100 }),
  });
  document.body.appendChild(el);
  return el;
}

describe('Header branch coverage', () => {
  beforeEach(() => {
    // Reset hash and CSS var
    window.location.hash = '';
    document.documentElement.style.setProperty('--app-scroll-padding', '');
  });

  it('toggles scrolled styles when passing 50px threshold', async () => {
    const { container } = render(<Header />);
    const header = container.querySelector('header');
    expect(header).toBeTruthy();

    // Initially at top: expect transparent style
    expect(header.className).toMatch(/bg-transparent/);

    // Scroll down beyond threshold
    Object.defineProperty(window, 'scrollY', { value: 100, configurable: true });
  window.dispatchEvent(new Event('scroll'));

  await waitFor(() => expect(header.className).toMatch(/glass/));
  expect(header.className).not.toMatch(/bg-transparent/);

    // Scroll back to top
    Object.defineProperty(window, 'scrollY', { value: 0, configurable: true });
    window.dispatchEvent(new Event('scroll'));

    await waitFor(() => expect(header.className).toMatch(/bg-transparent/));
  });

  it('updates --app-scroll-padding on resize using header height', () => {
    const { container } = render(<Header />);
    const header = container.querySelector('header');

    const before = document.documentElement.style.getPropertyValue('--app-scroll-padding');

    // Simulate a measurable header height and trigger resize
    Object.defineProperty(header, 'offsetHeight', { value: 120, configurable: true });
    window.dispatchEvent(new Event('resize'));

    const after = document.documentElement.style.getPropertyValue('--app-scroll-padding');
    expect(after).toBe('152px'); // 120 + 32
    expect(after).not.toBe(before);
  });

  it('does not scroll on hashchange when target is missing, but scrolls when present', async () => {
    const scrollSpy = jest.spyOn(window, 'scrollTo').mockImplementation(() => {});

    // Start with a missing target
    window.location.hash = '#missing';
    render(<Header />);

    // Initial adjustForHash runs on a timeout
    await new Promise((r) => setTimeout(r, 0));
    expect(scrollSpy).not.toHaveBeenCalled();

    // Explicit hashchange with missing target
    window.dispatchEvent(new HashChangeEvent('hashchange'));
    await new Promise((r) => setTimeout(r, 0));
    expect(scrollSpy).not.toHaveBeenCalled();

    // Add a valid target and trigger hashchange
    createSection('exists', 400);
    window.location.hash = '#exists';
    window.dispatchEvent(new HashChangeEvent('hashchange'));
    await new Promise((r) => setTimeout(r, 0));

    expect(scrollSpy).toHaveBeenCalledWith({ top: expect.any(Number) });
    scrollSpy.mockRestore();
  });

  it('closes mobile menu when clicking on the backdrop', () => {
    const { container } = render(<Header />);
    const toggle = screen.getByRole('button', { name: /toggle navigation menu/i });

    // Open menu
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');

    // Click the dark backdrop to close
    const backdrop = container.querySelector('[class*="bg-black/60"]');
    expect(backdrop).toBeTruthy();
    fireEvent.click(backdrop);

    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });
});
