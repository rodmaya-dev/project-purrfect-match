import type { Breed } from '../../types/breed';
import BreedCard from '../BreedCard/BreedCard';
import './BreedList.css';

interface BreedListProps {
  breeds: Breed[];
}

function BreedList({ breeds }: BreedListProps) {
  return (
    <ul className="breed-list">
      {breeds.map((breed) => (
        <li key={breed.id} className="breed-list__item">
          <BreedCard breed={breed} />
        </li>
      ))}
    </ul>
  );
}

export default BreedList;