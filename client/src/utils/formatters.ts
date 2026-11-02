// Funciones que convierten datos limpios en texto para la interfaz.
// formatLifeSpan lo usa components/BreedCard para mostrar los años de vida
// de la raza (por ejemplo "14-17 years", o "12 years" si el rango es un solo valor).
import type { NumericRange } from '../types/breed';

export function formatLifeSpan({ min, max }: NumericRange): string {
  return min === max ? `${min} years` : `${min}-${max} years`;
}