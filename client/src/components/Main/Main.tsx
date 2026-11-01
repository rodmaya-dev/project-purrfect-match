import { useState } from 'react';
import { BREEDS_PAGE_SIZE } from '../../config/catApi';
import { MESSAGES } from '../../config/messages';
import type { BreedsState } from '../../hooks/useBreeds';
import type { QuizAnswers } from '../../types/quiz';
import BreedList from '../BreedList/BreedList';
import Quiz from '../Quiz/Quiz';
import QuizResults from '../QuizResults/QuizResults';
import StatusMessage from '../StatusMessage/StatusMessage';
import './Main.css';

interface MainProps {
  breedsState: BreedsState;
}

function Main({ breedsState }: MainProps) {
  // Los hooks siempre van arriba, antes de cualquier condicional.
  const [visibleCount, setVisibleCount] = useState(BREEDS_PAGE_SIZE);
  // null = el cuestionario aún no se termina.
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers | null>(null);

  const handleLoadMore = () => {
    setVisibleCount((current) => current + BREEDS_PAGE_SIZE);
  };

  // El cuestionario necesita las razas cargadas para poder puntuarlas.
  const quizSection =
    breedsState.status === 'success' && breedsState.breeds.length > 0 ? (
      <section className="main__section" aria-labelledby="quiz-title">
        <h2 id="quiz-title" className="main__section-title">
          {MESSAGES.quizSectionTitle}
        </h2>
        {quizAnswers ? (
          <QuizResults
            breeds={breedsState.breeds}
            answers={quizAnswers}
            onRestart={() => setQuizAnswers(null)}
          />
        ) : (
          <Quiz onComplete={setQuizAnswers} />
        )}
      </section>
    ) : null;

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
              {MESSAGES.shownCount(
                Math.min(visibleCount, breeds.length),
                breeds.length,
              )}
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
      {quizSection}
      <section className="main__section" aria-labelledby="breeds-title">
        <h2 id="breeds-title" className="main__section-title">
          Explore breeds
        </h2>
        {content}
      </section>
    </main>
  );
}

export default Main;