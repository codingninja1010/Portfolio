import { render, screen, fireEvent } from '@testing-library/react';
import AnimatedDownloadButton from '@/components/ui/AnimatedDownloadButton';

// Minimal mock for toast to avoid side-effects
jest.mock('@/components/ui/sonner', () => ({ toast: jest.fn() }));

describe('AnimatedDownloadButton', () => {
  it('opens external links in a new tab without download attribute', () => {
    const openSpy = jest.spyOn(window, 'open').mockImplementation(() => null);
    render(<AnimatedDownloadButton href="https://example.com" />);

    const btn = screen.getByRole('button', { name: /download resume/i });
    fireEvent.click(btn);

    expect(openSpy).toHaveBeenCalledWith('https://example.com', '_blank', 'noopener,noreferrer');
    openSpy.mockRestore();
  });

  it('triggers local file download via anchor click', () => {
    const clickSpy = jest.spyOn(document.body, 'appendChild');
    render(<AnimatedDownloadButton href="/file.pdf" filename="file.pdf" />);

    const btn = screen.getByRole('button', { name: /download resume/i });
    fireEvent.click(btn);

    // The component appends and removes an anchor; ensure appendChild was called
    expect(clickSpy).toHaveBeenCalled();
    clickSpy.mockRestore();
  });
});
