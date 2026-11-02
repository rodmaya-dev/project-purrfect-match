import { useState } from 'react';
import type { SubmitEvent } from 'react';
import { MESSAGES } from '../../config/messages';
import { QUIZ_QUESTIONS } from '../../config/quiz';
import type { QuizAnswers } from '../../types/quiz';
import { countAnswers } from '../../utils/quizScoring';
import Button from '../Button/Button';
import './Quiz.css';

// Valor del radio "No preference": se guarda como pregunta sin responder.
const NO_PREFERENCE = '';

interface QuizProps {
  onComplete: (answers: QuizAnswers) => void;
}

function Quiz({ onComplete }: QuizProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});

  const question = QUIZ_QUESTIONS[stepIndex];
  const isLastStep = stepIndex === QUIZ_QUESTIONS.length - 1;
  const canFinish = countAnswers(answers) > 0;
  const currentAnswer = answers[question.id];

  // El valor sale de las opciones de la propia pregunta (config/quiz.ts), así
  // que siempre es válido para ella. Este es el único punto donde TypeScript
  // no puede comprobarlo por sí solo.
  const handleSelect = (value: string) => {
    setAnswers((previous) => ({
      ...previous,
      [question.id]: value === NO_PREFERENCE ? undefined : value,
    }));
  };

  // Enter dentro del formulario también avanza, por eso todo pasa por aquí.
  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isLastStep) {
      setStepIndex((current) => current + 1);
      return;
    }
    if (canFinish) onComplete(answers);
  };

  return (
    <form className="quiz" onSubmit={handleSubmit}>
      <p className="quiz__progress">
        {MESSAGES.quizProgress(stepIndex + 1, QUIZ_QUESTIONS.length)}
      </p>

      <fieldset className="quiz__question">
        <legend className="quiz__title">{question.title}</legend>

        {question.options.map((option) => (
          <label key={option.value} className="quiz__option">
            <input
              type="radio"
              name={question.id}
              value={option.value}
              checked={currentAnswer === option.value}
              onChange={() => handleSelect(option.value)}
            />
            <span>{option.label}</span>
          </label>
        ))}

        <label className="quiz__option">
          <input
            type="radio"
            name={question.id}
            value={NO_PREFERENCE}
            checked={currentAnswer === undefined}
            onChange={() => handleSelect(NO_PREFERENCE)}
          />
          <span>{MESSAGES.quizNoPreference}</span>
        </label>
      </fieldset>

      <div className="quiz__actions">
        <Button
          variant="secondary"
          disabled={stepIndex === 0}
          onClick={() => setStepIndex((current) => current - 1)}
        >
          {MESSAGES.quizBack}
        </Button>
        <Button type="submit" disabled={isLastStep && !canFinish}>
          {isLastStep ? MESSAGES.quizFinish : MESSAGES.quizNext}
        </Button>
      </div>

      {isLastStep && !canFinish && (
        <p className="quiz__hint">{MESSAGES.quizNeedAnswer}</p>
      )}
    </form>
  );
}

export default Quiz;