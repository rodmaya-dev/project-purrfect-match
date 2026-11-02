// Forma CRUDA de lo que devuelve The Cat API. Solo se tipan los campos que
// usamos o que son problemáticos; la API devuelve más. No usar en componentes:
// para la interfaz está `Breed` (types/breed.ts), ya limpio.

export interface CatApiImage {
  id: string;
  width: number;
  height: number;
  url: string;
}

export interface CatApiWeight {
  imperial: string;
  metric: string;
}

export interface CatApiBreed {
  id: string;
  name: string;
  origin: string;
  description: string;
  temperament: string;
  life_span: string;
  weight: CatApiWeight;
  breed_group: string | null;
  alt_names?: string;
  reference_image_id?: string | null;
  image?: CatApiImage;
}