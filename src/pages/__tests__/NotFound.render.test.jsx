import { render, screen } from '@/test/test-utils';
import NotFound from '@/pages/NotFound';

describe('NotFound page', () => {
  it('renders 404 and a link back home', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<NotFound />);

    expect(screen.getByRole('heading', { name: /404/i })).toBeInTheDocument();
    const link = screen.getByRole('link', { name: /go back home/i });
    expect(link).toHaveAttribute('href', '/');
    spy.mockRestore();
  });
});
