import { useState } from 'react';
import { BREEDS_PAGE_SIZE } from '../../config/catApi';
import { MESSAGES } from '../../config/messages';
import type { BreedsState } from '../../hooks/useBreeds';
import BreedList from '../BreedList/BreedList';
import StatusMessage from '../StatusMessage/StatusMessage';
import './Main.css';

interface MainProps {
  breedsState: BreedsState;
}

function Main({ breedsState }: MainProps) {
  // Los hooks siempre van arriba, antes de cualquier condicional (regla del checklist).
  const [visibleCount, setVisibleCount] = useState(BREEDS_PAGE_SIZE);

  const handleLoadMore = () => {
    setVisibleCount((current) => current + BREEDS_PAGE_SIZE);
  };

  let content;
  switch (breedsState.status) {
    case 'loading':
      content = <StatusMessage variant="loading" message={MESSAGES.loading} />;
      break;
    case 'error':
      content = <StatusMessage variant="error" message={MESSAGES.error} />;
      break;
    case 'success': {
      const { breeds } = breedsState;
      if (breeds.length === 0) {
        content = <StatusMessage variant="empty" message={MESSAGES.empty} />;
        break;
      }
      const hasMore = visibleCount < breeds.length;
      content = (
        <>
          <BreedList breeds={breeds.slice(0, visibleCount)} />
          <div className="main__load-more">
            <p className="main__count" aria-live="polite">
              {MESSAGES.shownCount(Math.min(visibleCount, breeds.length), breeds.length)}
            </p>
            {hasMore && (
              <button
                type="button"
                className="main__load-more-button"
                onClick={handleLoadMore}
              >
                {MESSAGES.loadMore}
              </button>
            )}
          </div>
        </>
      );
      break;
    }
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