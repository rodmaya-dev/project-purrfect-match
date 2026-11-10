// Tipos de los gatos guardados de la API propia. Los usan utils/api.ts, la página
// de gatos guardados (SavedCats, SavedCatCard y useSavedCats) y el botón de
// guardar de las tarjetas (SaveCatButton).

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