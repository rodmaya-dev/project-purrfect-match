import { useEffect, useRef, useState } from 'react';
import { RESULTS_COUNT } from '../../config/quiz';
import { MESSAGES } from '../../config/messages';
import type { Breed } from '../../types/breed';
import type { QuizAnswers } from '../../types/quiz';
import { rankBreeds } from '../../utils/quizScoring';
import BreedList from '../BreedList/BreedList';
import StatusMessage from '../StatusMessage/StatusMessage';
import './QuizResults.css';

interface QuizResultsProps {
  breeds: Breed[];
  answers: QuizAnswers;
  onRestart: () => void;
}

function QuizResults({ breeds, answers, onRestart }: QuizResultsProps) {
  const [visibleCount, setVisibleCount] = useState(RESULTS_COUNT);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // El cuestionario desaparece al terminar: se lleva el foco al título para
  // que quien usa teclado o lector de pantalla note el cambio.
  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  const matches = rankBreeds(breeds, answers);
  const visibleMatches = matches.slice(0, visibleCount);
  const affinityById = Object.fromEntries(
    visibleMatches.map(({ breed, affinity }) => [breed.id, affinity]),
  );

  return (
    <div className="quiz-results">
      <h3 ref={titleRef} tabIndex={-1} className="quiz-results__title">
        {MESSAGES.quizResultsTitle}
      </h3>
      <p className="quiz-results__disclaimer">{MESSAGES.quizDisclaimer}</p>

      {matches.length === 0 ? (
        <StatusMessage variant="empty" message={MESSAGES.quizNoMatches} />
      ) : (
        <>
          <BreedList
            breeds={visibleMatches.map(({ breed }) => breed)}
            affinityById={affinityById}
          />
          <p className="quiz-results__count" aria-live="polite">
            {MESSAGES.quizMatchesCount(visibleMatches.length, matches.length)}
          </p>
        </>
      )}

      <div className="quiz-results__actions">
        {visibleCount < matches.length && (
          <button
            type="button"
            className="quiz-results__button quiz-results__button_primary"
            onClick={() => setVisibleCount((current) => current + RESULTS_COUNT)}
          >
            {MESSAGES.quizShowMore}
          </button>
        )}
        <button
          type="button"
          className="quiz-results__button quiz-results__button_secondary"
          onClick={onRestart}
        >
          {MESSAGES.quizRetake}
        </button>
      </div>
    </div>
  );
}

export default QuizResults;