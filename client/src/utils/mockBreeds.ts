import type { Breed } from '../types/breed';

export const MOCK_BREEDS: Breed[] = [
  {
    id: 'abys',
    name: 'Abyssinian',
    origin: 'Egypt',
    description:
      'Curious, active and affectionate. Abyssinians love climbing, exploring and spending time with their people, and they usually get along well with other pets.',
    lifeSpan: { min: 14, max: 15 },
    weightKg: { min: 3, max: 5 },
    temperament: ['Active', 'Energetic', 'Independent', 'Intelligent'],
    coat: ['short'],
    imageUrl: 'https://cdn2.thecatapi.com/images/0XYvRd7oD.jpg',
  },
  {
    id: 'beng',
    name: 'Bengal',
    origin: 'United States',
    description:
      'Athletic cats with a wild-looking spotted coat. Bengals are energetic and clever, and they need plenty of play and mental stimulation every day.',
    lifeSpan: { min: 12, max: 16 },
    weightKg: { min: 3.6, max: 5.4 },
    temperament: ['Alert', 'Agile', 'Energetic', 'Athletic'],
    coat: ['short'],
  },
  {
    id: 'mcoo',
    name: 'Maine Coon',
    origin: 'United States',
    description:
      'One of the largest domestic breeds, known for its gentle temperament and thick, shaggy coat. Maine Coons are sociable and relaxed with the whole family.',
    lifeSpan: { min: 12, max: 15 },
    weightKg: { min: 4, max: 8 },
    temperament: ['Adaptable', 'Gentle', 'Intelligent', 'Social'],
    coat: ['long'],
  },
  {
    id: 'siam',
    name: 'Siamese',
    origin: 'Thailand',
    description:
      'Vocal and very social, Siamese cats bond closely with their people and like to be part of everything that happens at home.',
    lifeSpan: { min: 12, max: 15 },
    weightKg: { min: 3, max: 5 },
    temperament: ['Active', 'Social', 'Vocal', 'Loyal'],
    coat: ['short'],
  },
  {
    id: 'sphy',
    name: 'Sphynx',
    origin: 'Canada',
    description:
      'Hairless, warm to the touch and full of personality. Sphynx cats are outgoing and affectionate, and they need regular skin care.',
    lifeSpan: { min: 14, max: 15 },
    weightKg: { min: 3, max: 5 },
    temperament: ['Outgoing', 'Loving', 'Lively', 'Social'],
    coat: ['hairless'],
  },
  {
    id: 'pers',
    name: 'Persian',
    origin: 'Iran',
    description:
      'Calm and gentle with a long, luxurious coat. Persians enjoy a quiet home and need daily brushing to keep their fur free of tangles.',
    lifeSpan: { min: 14, max: 15 },
    weightKg: { min: 3, max: 5 },
    temperament: ['Calm', 'Quiet', 'Gentle', 'Affectionate'],
    coat: ['long'],
  },
];