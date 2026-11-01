/**
 * Cálculo de afinidad del cuestionario.
 *
 * Cada pregunta respondida suma 1 punto si la raza coincide.
 * Afinidad = puntos / preguntas respondidas. Las reglas concretas
 * (palabras clave, cortes de peso) viven en config/quiz.ts.
 *
 * Si la raza no tiene datos para una pregunta (temperamento sin palabras de
 * energía, pelo sin clasificar), esa pregunta cuenta como fallo: no puntúa.
 */
import {
  CHARACTER_KEYWORDS,
  ENERGY_KEYWORDS,
  SIZE_LARGE_MIN_KG,
  SIZE_MEDIUM_MIN_KG,
} from '../config/quiz';
import type { Breed } from '../types/breed';
import type { BreedMatch, QuizAnswers, SizeAnswer } from '../types/quiz';

function hasAnyKeyword(breed: Breed, keywords: readonly string[]): boolean {
  return breed.temperament.some((word) => keywords.includes(word));
}

// Se usa el punto medio del rango de peso para clasificar la raza.
function getSizeCategory(breed: Breed): SizeAnswer {
  const midpointKg = (breed.weightKg.min + breed.weightKg.max) / 2;
  if (midpointKg >= SIZE_LARGE_MIN_KG) return 'large';
  if (midpointKg >= SIZE_MEDIUM_MIN_KG) return 'medium';
  return 'small';
}

// Un resultado por pregunta: undefined = sin responder (no cuenta),
// true = coincide, false = no coincide.
function evaluateAnswers(
  breed: Breed,
  answers: QuizAnswers,
): (boolean | undefined)[] {
  return [
    answers.energy === undefined
      ? undefined
      : hasAnyKeyword(breed, ENERGY_KEYWORDS[answers.energy]),
    answers.character === undefined
      ? undefined
      : hasAnyKeyword(breed, CHARACTER_KEYWORDS[answers.character]),
    answers.size === undefined
      ? undefined
      : getSizeCategory(breed) === answers.size,
    answers.coat === undefined ? undefined : breed.coat.includes(answers.coat),
  ];
}

export function countAnswers(answers: QuizAnswers): number {
  return Object.values(answers).filter((value) => value !== undefined).length;
}

/**
 * Devuelve todas las razas con al menos una coincidencia, de mayor a menor
 * afinidad. No se corta a un número fijo: con empates en la cima, un corte
 * dejaría fuera razas con el mismo puntaje. La pantalla de resultados decide
 * cuántas muestra a la vez.
 * Sin ninguna respuesta no hay nada que comparar, así que devuelve [].
 */
export function rankBreeds(
  breeds: Breed[],
  answers: QuizAnswers,
): BreedMatch[] {
  if (countAnswers(answers) === 0) return [];

  return breeds
    .map((breed) => {
      const answered = evaluateAnswers(breed, answers).filter(
        (result) => result !== undefined,
      );
      const points = answered.filter(Boolean).length;
      return {
        breed,
        points,
        affinity: Math.round((points / answered.length) * 100),
      };
    })
    .filter(({ points }) => points > 0)
    .sort(
      (a, b) =>
        b.points - a.points || a.breed.name.localeCompare(b.breed.name),
    )
    .map(({ breed, affinity }) => ({ breed, affinity }));
}