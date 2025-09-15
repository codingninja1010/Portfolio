import { render, screen } from '@testing-library/react';
import App from '@/App';

describe('App', () => {
  it('renders root app with header content', () => {
    render(<App />);
    // Header brand text from Header inside Index route (may appear in footer too)
    const matches = screen.getAllByText(/Rakesh Vajrapu/i);
    expect(matches.length).toBeGreaterThan(0);
  });
});
