import { render, screen, fireEvent } from '@/test/test-utils';
import Contact from '@/components/Contact';

describe('Contact', () => {
  it('submits the form and navigates to a mailto link', () => {
    // Mock window.open for reliable testing in jsdom
    const openSpy = jest.spyOn(window, 'open').mockImplementation(() => null);

    render(<Contact />);
    fireEvent.change(screen.getByLabelText(/your name/i), { target: { value: 'Alice' } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'alice@example.com' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Hello there' } });
    fireEvent.submit(screen.getByRole('button', { name: /send message/i }).closest('form'));

    expect(openSpy).toHaveBeenCalled();
    const calledWith = openSpy.mock.calls[0][0];
    expect(calledWith.startsWith('mailto:')).toBe(true);
    const decoded = decodeURIComponent(calledWith);
    expect(decoded).toContain('Alice');
    expect(decoded).toContain('alice@example.com');
    expect(decoded).toContain('Hello there');
    openSpy.mockRestore();
  });
});
