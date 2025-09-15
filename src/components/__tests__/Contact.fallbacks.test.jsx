import { render, screen, fireEvent } from '@/test/test-utils';
import Contact from '@/components/Contact';

describe('Contact fallbacks', () => {
  function fillAndSubmit() {
    fireEvent.change(screen.getByLabelText(/your name/i), { target: { value: 'Bob' } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'bob@example.com' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Ping' } });
    fireEvent.submit(screen.getByRole('button', { name: /send message/i }).closest('form'));
  }

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
    fillAndSubmit();

    expect(assignMock).toHaveBeenCalledWith(expect.stringMatching(/^mailto:/));
  });

  it('uses env.open success path when available', () => {
    const openMock = jest.fn();
    const mockEnv = {
      open: openMock,
      location: { assign: jest.fn(), href: 'http://localhost/' }
    };
    render(<Contact env={mockEnv} />);
    fillAndSubmit();
    expect(openMock).toHaveBeenCalledWith(expect.stringMatching(/^mailto:/));
    expect(mockEnv.location.assign).not.toHaveBeenCalled();
  });

  it('falls back to location.href when assign throws', () => {
    const hrefSetMock = jest.fn();
    const mockEnv = {
      open: () => { throw new Error('blocked'); },
      location: {
        assign: () => { throw new Error('assign blocked'); },
        get href() { return 'http://localhost/'; },
        set href(v) { hrefSetMock(v); }
      }
    };
    render(<Contact env={mockEnv} />);
    fillAndSubmit();
    expect(hrefSetMock).toHaveBeenCalledWith(expect.stringMatching(/^mailto:/));
  });
});
