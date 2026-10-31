/**
 * Capa de limpieza: convierte CatApiBreed (crudo) en Breed (limpio).
 * Es el equivalente a pasar de una tabla de staging a la tabla final.
 *
 * Las reglas y valores concretos viven en config/breedCleaning.ts; aquí
 * solo está la lógica. Las decisiones salen del documento de alcance
 * (Etapa 0), sección "Datos de The Cat API y limpieza".
 *
 * Resultado esperado: 107 razas de la API - 7 corruptas = 100 razas.
 */
import {
  EXCLUDED_BREED_NAMES,
  NON_TEMPERAMENT_PATTERN,
  TEMPERAMENT_ALIASES,
} from '../config/breedCleaning';
import type { CatApiBreed } from '../types/catApi';
import type { Breed, CoatType, NumericRange } from '../types/breed';

// La API manda rangos como texto sin unidad ("14-17", "3.6-5.4").
// Se convierten a números para poder comparar en el cuestionario.
function parseRange(raw: string): NumericRange | null {
  const numbers = raw.match(/\d+(?:\.\d+)?/g)?.map(Number);
  if (!numbers || numbers.length === 0) return null;
  return { min: Math.min(...numbers), max: Math.max(...numbers) };
}

// `temperament` llega como un solo texto separado por comas. Se separa en
// palabras, se descartan los consejos de cuidado que la API mezcló ahí
// y se unifican variantes ("Easygoing" -> "Easy Going"). El Set quita repetidas.
function parseTemperament(raw: string): string[] {
  const words = raw
    .split(',')
    .map((word) => word.trim())
    .filter((word) => word !== '' && !NON_TEMPERAMENT_PATTERN.test(word))
    .map((word) => TEMPERAMENT_ALIASES[word] ?? word);
  return [...new Set(words)];
}

// `breed_group` mezcla largo de pelo con otras categorías. Se devuelve un
// arreglo porque una raza puede venir en dos largos ("Short/Long-hair"):
// así puntúa en cualquiera de las dos respuestas del cuestionario.
// Un arreglo vacío significa "sin clasificar" (null, Rex, Hybrid, Varies).
function parseCoat(breedGroup: string | null): CoatType[] {
  if (!breedGroup) return [];
  const group = breedGroup.toLowerCase();
  if (group.includes('hairless')) return ['hairless'];

  const coat: CoatType[] = [];
  if (group.includes('short')) coat.push('short');
  // "Semi-longhair", "Semi-long" y "Medium-hair" se agrupan como largo.
  if (group.includes('long') || group.includes('medium')) coat.push('long');
  return coat;
}

// Devuelve null (en vez de lanzar un error) para descartar solo esa raza
// sin tumbar la carga de las demás.
function cleanBreed(raw: CatApiBreed): Breed | null {
  // Filtro principal: las 7 razas corruptas se excluyen por nombre.
  if (EXCLUDED_BREED_NAMES.has(raw.name)) return null;

  // Red de seguridad: si peso o esperanza de vida no se pueden leer, se descarta.
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
    imageUrl: raw.image?.url, // 41 de 107 razas no traen imagen
  };
}

export function cleanBreeds(rawBreeds: CatApiBreed[]): Breed[] {
  return rawBreeds.flatMap((raw) => {
    const breed = cleanBreed(raw);
    return breed ? [breed] : [];
  });
}