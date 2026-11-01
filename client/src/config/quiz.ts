// Reglas y textos del cuestionario. Las decisiones salen del documento de
// alcance (Etapa 0), sección "Cuestionario".
//
// Cada pregunta suma 1 punto si la raza coincide. Afinidad = puntos /
// preguntas respondidas. Lo que la raza no puede responder (temperamento sin
// palabras de energía, pelo sin clasificar) cuenta 0.
import type {
  CharacterAnswer,
  EnergyAnswer,
  QuizQuestion,
} from '../types/quiz';

// Palabras de `temperament` que indican cada respuesta. Ya vienen
// normalizadas por la capa de limpieza ("Easygoing" -> "Easy Going").
export const ENERGY_KEYWORDS: Readonly<Record<EnergyAnswer, readonly string[]>> = {
  high: ['Active', 'Lively', 'Energetic', 'Athletic', 'Agile'],
  low: ['Calm', 'Quiet', 'Easy Going', 'Relaxed', 'Peaceful'],
};

export const CHARACTER_KEYWORDS: Readonly<
  Record<CharacterAnswer, readonly string[]>
> = {
  sociable: ['Social', 'Friendly'],
  independent: ['Independent', 'Reserved'],
};

// Cortes de tamaño sobre el punto medio del rango de peso (kg). Con las 100
// razas limpias dejan 42 pequeñas, 37 medianas y 21 grandes.
export const SIZE_MEDIUM_MIN_KG = 5;
export const SIZE_LARGE_MIN_KG = 6;

// Cuántas coincidencias muestra la pantalla de resultados por tramo
// (el resto se ve con "Show more matches").
export const RESULTS_COUNT = 5;

export const QUIZ_QUESTIONS: readonly QuizQuestion[] = [
  {
    id: 'energy',
    title: 'How much energy should your cat have?',
    options: [
      { value: 'high', label: 'High: playful and active' },
      { value: 'low', label: 'Low: calm and relaxed' },
    ],
  },
  {
    id: 'character',
    title: 'What kind of character do you prefer?',
    options: [
      { value: 'sociable', label: 'Sociable: always near people' },
      { value: 'independent', label: 'Independent: happy on its own' },
    ],
  },
  {
    id: 'size',
    title: 'What size do you prefer?',
    options: [
      { value: 'small', label: `Small (under ${SIZE_MEDIUM_MIN_KG} kg)` },
      {
        value: 'medium',
        label: `Medium (${SIZE_MEDIUM_MIN_KG} to ${SIZE_LARGE_MIN_KG} kg)`,
      },
      { value: 'large', label: `Large (${SIZE_LARGE_MIN_KG} kg or more)` },
    ],
  },
  {
    id: 'coat',
    title: 'What kind of coat do you prefer?',
    options: [
      { value: 'short', label: 'Short hair' },
      { value: 'long', label: 'Long hair' },
      { value: 'hairless', label: 'Hairless' },
    ],
  },
];