import { MESSAGES } from '../../config/messages';
import type { BreedsState } from '../../hooks/useBreeds';
import BreedList from '../BreedList/BreedList';
import StatusMessage from '../StatusMessage/StatusMessage';
import './Main.css';

interface MainProps {
  breedsState: BreedsState;
}

function Main({ breedsState }: MainProps) {
  // El switch sobre `status` hace que TypeScript te obligue a cubrir los
  // tres casos, y `breeds` solo es accesible dentro de 'success'.
  let content;
  switch (breedsState.status) {
    case 'loading':
      content = <StatusMessage variant="loading" message={MESSAGES.loading} />;
      break;
    case 'error':
      content = <StatusMessage variant="error" message={MESSAGES.error} />;
      break;
    case 'success':
      content =
        breedsState.breeds.length === 0 ? (
          <StatusMessage variant="empty" message={MESSAGES.empty} />
        ) : (
          <BreedList breeds={breedsState.breeds} />
        );
      break;
  }

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
        {content}
      </section>
    </main>
  );
}

export default Main;