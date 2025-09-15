import { render, screen, fireEvent } from '@/test/test-utils';
import Contact from '@/components/Contact';

describe('Contact fallbacks', () => {
  it('falls back when window.open throws (simulating popup blocker)', () => {
    const assignMock = jest.fn();
    const hrefSetMock = jest.fn();
    const mockEnv = {
      open: () => { throw new Error('blocked'); },
      location: {
        assign: assignMock,
        get href() { return 'http://localhost/'; },
        set href(v) { hrefSetMock(v); }
      }
    };

    render(<Contact env={mockEnv} />);
    fireEvent.change(screen.getByLabelText(/your name/i), { target: { value: 'Bob' } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'bob@example.com' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Ping' } });
    fireEvent.submit(screen.getByRole('button', { name: /send message/i }).closest('form'));

    expect(assignMock).toHaveBeenCalledWith(expect.stringMatching(/^mailto:/));
  });
});
