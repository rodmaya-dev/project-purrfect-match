// Tipos de los gatos guardados de mi API. Los usan utils/api.ts y, después,
// la página de gatos guardados y el botón de guardar de las tarjetas.

export interface SavedCat {
  _id: string;
  breedId: string;
  breedName: string;
  imageUrl?: string;
  note?: string;
}

export interface SaveCatPayload {
  breedId: string;
  breedName: string;
  imageUrl?: string;
  note?: string;
}