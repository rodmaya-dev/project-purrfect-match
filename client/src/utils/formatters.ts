import type { NumericRange } from '../types/breed';

export function formatLifeSpan({ min, max }: NumericRange): string {
  return min === max ? `${min} years` : `${min}-${max} years`;
}