import {
  EXCLUDED_BREED_NAMES,
  NON_TEMPERAMENT_PATTERN,
  TEMPERAMENT_ALIASES,
} from '../config/breedCleaning';
import type { CatApiBreed } from '../types/catApi';
import type { Breed, CoatType, NumericRange } from '../types/breed';

// Acepta "14-17", "3.6-5.4" o un solo número; devuelve null si no hay cifras.
function parseRange(raw: string): NumericRange | null {
  const numbers = raw.match(/\d+(?:\.\d+)?/g)?.map(Number);
  if (!numbers || numbers.length === 0) return null;
  return { min: Math.min(...numbers), max: Math.max(...numbers) };
}

function parseTemperament(raw: string): string[] {
  const words = raw
    .split(',')
    .map((word) => word.trim())
    .filter((word) => word !== '' && !NON_TEMPERAMENT_PATTERN.test(word))
    .map((word) => TEMPERAMENT_ALIASES[word] ?? word);
  return [...new Set(words)];
}

function parseCoat(breedGroup: string | null): CoatType[] {
  if (!breedGroup) return [];
  const group = breedGroup.toLowerCase();
  if (group.includes('hairless')) return ['hairless'];

  const coat: CoatType[] = [];
  if (group.includes('short')) coat.push('short');
  if (group.includes('long') || group.includes('medium')) coat.push('long');
  return coat; // Rex, Hybrid y Varies no contienen ninguna palabra: quedan []
}

function cleanBreed(raw: CatApiBreed): Breed | null {
  if (EXCLUDED_BREED_NAMES.has(raw.name)) return null;

  const lifeSpan = parseRange(raw.life_span);
  const weightKg = parseRange(raw.weight.metric);
  if (!lifeSpan || !weightKg) return null;

  return {
    id: raw.id,
    name: raw.name,
    origin: raw.origin,
    description: raw.description,
    lifeSpan,
    weightKg,
    temperament: parseTemperament(raw.temperament),
    coat: parseCoat(raw.breed_group),
    imageUrl: raw.image?.url,
  };
}

export function cleanBreeds(rawBreeds: CatApiBreed[]): Breed[] {
  return rawBreeds.flatMap((raw) => {
    const breed = cleanBreed(raw);
    return breed ? [breed] : [];
  });
}