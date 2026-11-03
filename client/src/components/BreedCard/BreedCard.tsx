import { useState } from 'react';
import placeholderImage from '../../images/breed-placeholder.svg';
import type { Breed } from '../../types/breed';
import { formatLifeSpan } from '../../utils/formatters';
import './BreedCard.css';

interface BreedCardProps {
  breed: Breed;
}

function BreedCard({ breed }: BreedCardProps) {
  const [hasImageError, setHasImageError] = useState<boolean>(false);

  const hasPhoto = Boolean(breed.imageUrl) && !hasImageError;
  const imageSrc = hasPhoto ? breed.imageUrl : placeholderImage;
  const imageAlt = hasPhoto
    ? `Photo of a ${breed.name} cat`
    : `No photo available for ${breed.name}`;

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
        <p className="breed-card__meta">{formatLifeSpan(breed.lifeSpan)}</p>
        <h3 className="breed-card__title">{breed.name}</h3>
        <p className="breed-card__description">{breed.description}</p>
        <p className="breed-card__origin">{breed.origin}</p>
      </div>
    </article>
  );
}

export default BreedCard;