import { renderHook, act } from '@testing-library/react';
import { useToast } from '@/hooks/use-toast';

describe('useToast public API', () => {
  it('creates, updates and dismisses a toast via returned API', () => {
    const { result } = renderHook(() => useToast());

    // create
    let created;
    act(() => {
      created = result.current.toast({ title: 'Hello' });
    });
    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0]).toMatchObject({ id: created.id, open: true, title: 'Hello' });

    // update
    act(() => {
      created.update({ title: 'Updated' });
    });
    expect(result.current.toasts[0].title).toBe('Updated');

    // dismiss (sets open=false immediately)
    act(() => {
      created.dismiss();
    });
    expect(result.current.toasts[0].open).toBe(false);

    // dismiss all via hook method
    act(() => {
      result.current.dismiss();
    });
    // open remains false for all
    expect(result.current.toasts.every(t => t.open === false)).toBe(true);
  });
});
