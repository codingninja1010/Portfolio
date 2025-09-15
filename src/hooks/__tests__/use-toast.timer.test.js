import { renderHook, act } from '@testing-library/react';
import { useToast } from '@/hooks/use-toast';

jest.useFakeTimers();

describe('useToast timer-driven removal', () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  it('queues REMOVE_TOAST after DISMISS_TOAST via timer', () => {
    const { result } = renderHook(() => useToast());
    let t;
    act(() => { t = result.current.toast({ title: 'T' }); });
    const id = t.id;
    // Dismiss to schedule removal
    act(() => { t.dismiss(); });
    // Should be closed but still present before timers run
    expect(result.current.toasts[0].open).toBe(false);
    // Fast-forward timers to trigger REMOVE_TOAST dispatch
    act(() => { jest.runOnlyPendingTimers(); });
    // After removal, toasts array should be empty
    expect(result.current.toasts.length).toBe(0);
  });

  it('global dismiss without id enqueues all and sets open=false', () => {
    const { result } = renderHook(() => useToast());
    let a, b;
    act(() => {
      a = result.current.toast({ title: 'A' });
      b = result.current.toast({ title: 'B' });
    });
    act(() => { result.current.dismiss(undefined); });
    expect(result.current.toasts.every(t => t.open === false)).toBe(true);
    // Run timers to clear them all
    act(() => { jest.runOnlyPendingTimers(); });
    expect(result.current.toasts.length).toBe(0);
  });
});
