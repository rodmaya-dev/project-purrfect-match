// Tarjeta de un gato guardado: foto, nombre, nota y botón para eliminarlo. La
// usa SavedCats. Reutiliza los estilos de BreedCard.

import { useState } from 'react';
import { MESSAGES } from '../../config/messages';
import placeholderImage from '../../images/breed-placeholder.svg';
import type { SavedCat } from '../../types/savedCat';
import Button from '../Button/Button';
import '../BreedCard/BreedCard.css';
import './SavedCatCard.css';

interface SavedCatCardProps {
  cat: SavedCat;
  isRemoving: boolean;
  onRemove: (id: string) => void;
}

function SavedCatCard({ cat, isRemoving, onRemove }: SavedCatCardProps) {
  const [hasImageError, setHasImageError] = useState<boolean>(false);

  const hasPhoto = Boolean(cat.imageUrl) && !hasImageError;
  const imageSrc = hasPhoto ? cat.imageUrl : placeholderImage;
  const imageAlt = hasPhoto
    ? `Photo of a ${cat.breedName} cat`
    : `No photo available for ${cat.breedName}`;

  return (
    <article className="breed-card">
      <img
        className="breed-card__image"
        src={imageSrc}
        alt={imageAlt}
        width={400}
        height={272}
        loading="lazy"
        onError={() => setHasImageError(true)}
      />
      <div className="breed-card__content">
        <h2 className="breed-card__title">{cat.breedName}</h2>
        {cat.note && <p className="saved-cat-card__note">{cat.note}</p>}
        <div className="saved-cat-card__actions">
          <Button
            variant="secondary"
            disabled={isRemoving}
            aria-label={MESSAGES.savedCatsRemoveLabel(cat.breedName)}
            onClick={() => onRemove(cat._id)}
          >
            {isRemoving ? MESSAGES.savedCatsRemoving : MESSAGES.savedCatsRemove}
          </Button>
        </div>
      </div>
    </article>
  );
}

export default SavedCatCard;