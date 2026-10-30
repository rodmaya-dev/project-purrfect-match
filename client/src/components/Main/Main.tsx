import { MOCK_BREEDS } from '../../utils/mockBreeds';
import BreedList from '../BreedList/BreedList';
import './Main.css';

function Main() {
  return (
    <main className="page main">
      <h1 className="main__title">Find your perfect cat breed</h1>
      <p className="main__subtitle">
        Answer a short quiz or explore every breed on your own.
      </p>
      <section aria-labelledby="breeds-title">
        <h2 id="breeds-title" className="main__section-title">
          Explore breeds
        </h2>
        <BreedList breeds={MOCK_BREEDS} />
      </section>
    </main>
  );
}

export default Main;