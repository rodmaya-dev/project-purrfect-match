import { MESSAGES } from '../../config/messages';
import type { Breed } from '../../types/breed';
import BreedCard from '../BreedCard/BreedCard';
import './BreedList.css';

interface BreedListProps {
  breeds: Breed[];
  // Solo para los resultados del cuestionario: porcentaje por id de raza.
  affinityById?: Readonly<Record<string, number>>;
}

function BreedList({ breeds, affinityById }: BreedListProps) {
  return (
    <ul className="breed-list">
      {breeds.map((breed) => {
        const affinity = affinityById?.[breed.id];
        return (
          <li key={breed.id} className="breed-list__item">
            {affinity !== undefined && (
              <p className="breed-list__affinity">
                {MESSAGES.quizAffinity(affinity)}
              </p>
            )}
            <BreedCard breed={breed} />
          </li>
        );
      })}
    </ul>
  );
}

export default BreedList;