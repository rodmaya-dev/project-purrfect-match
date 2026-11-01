// Tipos del cuestionario. Cada pregunta tiene su propio tipo de respuesta,
// así el compilador detecta opciones mal escritas.
import type { Breed, CoatType } from './breed';

export type EnergyAnswer = 'high' | 'low';
export type CharacterAnswer = 'sociable' | 'independent';
export type SizeAnswer = 'small' | 'medium' | 'large';

// Una pregunta sin responder (o saltada con "No preference") queda como
// undefined y no cuenta ni a favor ni en contra al calcular la afinidad.
export interface QuizAnswers {
  energy?: EnergyAnswer;
  character?: CharacterAnswer;
  size?: SizeAnswer;
  coat?: CoatType;
}

export type QuizQuestionId = keyof QuizAnswers;

export interface QuizOption<Value extends string> {
  value: Value;
  label: string;
}

// Unión de las cuatro preguntas: cada una enlaza su `id` con el tipo de
// respuesta que le corresponde en QuizAnswers.
export type QuizQuestion = {
  [Id in QuizQuestionId]-?: {
    id: Id;
    title: string;
    options: QuizOption<NonNullable<QuizAnswers[Id]>>[];
  };
}[QuizQuestionId];

// Una raza con su resultado del cuestionario.
export interface BreedMatch {
  breed: Breed;
  affinity: number; // 0-100, redondeado
}