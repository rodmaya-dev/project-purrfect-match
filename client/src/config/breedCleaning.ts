// Razas con datos corruptos en The Cat API (peso con frases, life_span de un digito).
export const EXCLUDED_BREED_NAMES: ReadonlySet<string> = new Set([
  'Caracat',
  'Dwelf',
  'Elf Cat',
  'Kellas Cat',
  'Napoleon Longhair',
  'Pantherette',
  'Singapura Tabby',
]);

// Valores de 'temperament' que son consejos de cuidado, no temperamento.
export const NON_TEMPERAMENT_PATTERN =
  /grooming|brushing|skin care|not applicable|^varies/i;

// Variantes de escritura que significan lo mismo.
export const TEMPERAMENT_ALIASES: Readonly<Record<string, string>> = {
  Easygoing: 'Easy Going',
};