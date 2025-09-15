import { cn } from '@/lib/utils';

describe('cn', () => {
  it('merges class names and dedupes tailwind conflicts', () => {
    const result = cn('px-2', false && 'hidden', ['text-sm', 'px-4']);
    expect(result).toContain('text-sm');
    expect(result).toContain('px-4');
    expect(result.includes('px-2')).toBe(false);
  });
});
