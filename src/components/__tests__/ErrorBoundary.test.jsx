import { render, screen, fireEvent } from '@testing-library/react';
import ErrorBoundary from '@/components/ErrorBoundary';

function Boom() {
  throw new Error('Boom');
}

describe('ErrorBoundary', () => {
  it('renders fallback UI and reload button is clickable', () => {
    render(
      <ErrorBoundary>
        <Boom />
      </ErrorBoundary>
    );

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();

    const btn = screen.getByRole('button', { name: /reload/i });
    expect(() => fireEvent.click(btn)).not.toThrow();
    // Since the child keeps throwing, the fallback should remain
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });
});
