export interface NumericRange {
  min: number;
  max: number;
}

export interface Breed {
  id: string;
  name: string;
  origin: string;
  description: string;
  lifeSpan: NumericRange;
  imageUrl?: string;
}