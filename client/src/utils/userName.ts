// Nombre corto de la persona para el encabezado: solo la primera palabra y, si aun así es
// muy larga, recortada con puntos suspensivos. Lo usa Header.

import { HEADER_NAME_MAX_LENGTH } from '../config/header';

export function getHeaderName(fullName: string): string {
  const [firstWord = ''] = fullName.trim().split(/\s+/);
  // Array.from separa por caracteres reales y no parte un emoji por la mitad
  const characters = Array.from(firstWord);

  return characters.length > HEADER_NAME_MAX_LENGTH
    ? `${characters.slice(0, HEADER_NAME_MAX_LENGTH - 1).join('')}…`
    : firstWord;
}