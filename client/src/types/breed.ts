// Forma LIMPIA de una raza, producida por utils/catApiCleaner.ts.
// Es el único tipo de raza que usan los componentes.

export interface NumericRange {
  min: number;
  max: number;
}

export type CoatType = 'short' | 'long' | 'hairless';

export interface Breed {
  id: string;
  name: string;
  origin: string;
  description: string;
  lifeSpan: NumericRange; // años
  weightKg: NumericRange;
  temperament: string[];
  coat: CoatType[]; // vacío = sin clasificar
  imageUrl?: string;
}