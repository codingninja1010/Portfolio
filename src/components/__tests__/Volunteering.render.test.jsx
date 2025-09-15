import { render, screen } from '@/test/test-utils';
import Volunteering from '@/components/Volunteering';

describe('Volunteering section', () => {
  it('renders heading and key entries with periods', () => {
    render(<Volunteering />);

    expect(screen.getByRole('heading', { name: /Volunteering/i })).toBeInTheDocument();

    // Titles
    expect(screen.getByRole('heading', { name: /Microsoft Beta Student Ambassador/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Core Team Member/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Core Member/i })).toBeInTheDocument();

    // Organizations as specific heading levels to avoid ambiguous matches
    expect(screen.getByRole('heading', { level: 4, name: /Microsoft/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 4, name: /Atlassian Visakhapatnam Chapter/i })).toBeInTheDocument();
    expect(screen.getByText(/Oct'24 - Present/i)).toBeInTheDocument();
  });
});
