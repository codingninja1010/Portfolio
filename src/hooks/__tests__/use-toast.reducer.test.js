import { reducer } from '@/hooks/use-toast';

describe('use-toast reducer', () => {
  it('handles ADD_TOAST and respects limit', () => {
    const empty = { toasts: [] };
    const state1 = reducer(empty, { type: 'ADD_TOAST', toast: { id: '1', open: true, title: 'A' } });
    expect(state1.toasts).toHaveLength(1);

    // Adding another should slice to limit 1 (latest first)
    const state2 = reducer(state1, { type: 'ADD_TOAST', toast: { id: '2', open: true, title: 'B' } });
    expect(state2.toasts).toHaveLength(1);
    expect(state2.toasts[0].id).toBe('2');
  });

  it('updates existing toast by id', () => {
    const start = { toasts: [{ id: '1', open: true, title: 'A' }] };
    const next = reducer(start, { type: 'UPDATE_TOAST', toast: { id: '1', title: 'A2', open: false } });
    expect(next.toasts[0]).toMatchObject({ id: '1', title: 'A2', open: false });
  });

  it('dismisses a toast (sets open=false) and schedules removal', () => {
    jest.useFakeTimers();
    const start = { toasts: [{ id: '1', open: true, title: 'A' }] };
    const next = reducer(start, { type: 'DISMISS_TOAST', toastId: '1' });
    expect(next.toasts[0].open).toBe(false);
    jest.useRealTimers();
  });

  it('dismisses all toasts when toastId undefined', () => {
    const start = { toasts: [{ id: '1', open: true }, { id: '2', open: true }] };
    const next = reducer(start, { type: 'DISMISS_TOAST' });
    expect(next.toasts.every(t => t.open === false)).toBe(true);
  });

  it('removes toast by id', () => {
    const start = { toasts: [{ id: '1', open: false }, { id: '2', open: true }] };
    const next = reducer(start, { type: 'REMOVE_TOAST', toastId: '1' });
    expect(next.toasts.map(t => t.id)).toEqual(['2']);
  });

  it('removes all when REMOVE_TOAST without id', () => {
    const start = { toasts: [{ id: '1', open: false }, { id: '2', open: true }] };
    const next = reducer(start, { type: 'REMOVE_TOAST' });
    expect(next.toasts).toHaveLength(0);
  });
});
