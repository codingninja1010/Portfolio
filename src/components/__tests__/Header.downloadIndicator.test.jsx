import { render, screen, waitFor } from '@/test/test-utils';
import Header from '@/components/Header';

describe('Header resume download indicator', () => {
  it('shows and hides progress bar when custom events fire', async () => {
    render(<Header />);

    // Wait for effects to mount
    await new Promise((r) => setTimeout(r, 0));

    // Initially hidden
    expect(screen.queryByTestId('resume-download-progress')).toBeNull();

    // Dispatch start event and wait a tick for state update
    window.dispatchEvent(new Event('resume-download:start'));
    await waitFor(() => {
      expect(screen.getByTestId('resume-download-progress')).toBeInTheDocument();
    });

    // Dispatch end event and wait for unmount/removal
    window.dispatchEvent(new Event('resume-download:end'));
    await waitFor(() => {
      expect(screen.queryByTestId('resume-download-progress')).toBeNull();
    });
  });
});
