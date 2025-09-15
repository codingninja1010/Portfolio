import { renderHook, act } from '@testing-library/react';
import { useToast } from '@/hooks/use-toast';

describe('useToast branch coverage', () => {
  it('UPDATE_TOAST non-matching branch leaves other toasts unchanged', () => {
    const { result } = renderHook(() => useToast());
    let a, b;
    act(() => {
      a = result.current.toast({ title: 'A' });
      b = result.current.toast({ title: 'B' });
    });
    const before = result.current.toasts.find(t => t.id === a.id)?.title;
    // Update B, ensure A title unaffected
    act(() => {
      b.update({ title: 'B2' });
    });
    const after = result.current.toasts.find(t => t.id === a.id)?.title;
    expect(after).toBe(before);
  });

  it('onOpenChange(false) auto-dismisses via dismiss callback', () => {
    const { result } = renderHook(() => useToast());
    let created;
    act(() => {
      created = result.current.toast({ title: 'Auto' });
    });
    // Find the toast and invoke onOpenChange(false)
    const t0 = result.current.toasts[0];
    expect(t0.onOpenChange).toBeInstanceOf(Function);
    act(() => {
      t0.onOpenChange(false);
    });
    expect(result.current.toasts[0].open).toBe(false);
  });
});
