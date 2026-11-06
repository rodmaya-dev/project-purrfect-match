// Botón "Save" de las tarjetas de raza. Sin sesión lleva a /signin; con sesión abre un
// campo para una nota opcional y guarda la raza en la API propia. Lo renderiza BreedCard.

import { useContext, useEffect, useId, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NOTE_MAX_LENGTH } from '../../config/api';
import { MESSAGES } from '../../config/messages';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { NoticeContext } from '../../contexts/NoticeContext';
import type { Breed } from '../../types/breed';
import { ApiError, saveCat } from '../../utils/api';
import { getErrorMessage } from '../../utils/errors';
import Button from '../Button/Button';
import './SaveCatButton.css';

interface SaveCatButtonProps {
  breed: Breed;
}

function SaveCatButton({ breed }: SaveCatButtonProps) {
  const { currentUser } = useContext(CurrentUserContext);
  const { showNotice } = useContext(NoticeContext);
  const navigate = useNavigate();
  const noteFieldId = useId();
  const noteCounterId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const noteFieldRef = useRef<HTMLTextAreaElement>(null);
  const shouldRestoreFocusRef = useRef<boolean>(false);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [note, setNote] = useState<string>('');
  const [isSaving, setIsSaving] = useState<boolean>(false);
  // Se guarda quién la guardó: si cambia la sesión, el botón vuelve a "Save"
  const [savedByUserId, setSavedByUserId] = useState<string | null>(null);

  const isSaved = currentUser !== null && savedByUserId === currentUser._id;

  // Al abrir el panel el foco pasa al campo; al cancelar vuelve al botón para quien navega con teclado
  useEffect(() => {
    if (isFormOpen) {
      noteFieldRef.current?.focus();
    } else if (shouldRestoreFocusRef.current) {
      shouldRestoreFocusRef.current = false;
      containerRef.current?.querySelector('button')?.focus();
    }
  }, [isFormOpen]);

  const closeForm = () => {
    setIsFormOpen(false);
    setNote('');
  };

  const handleOpenForm = () => {
    if (!currentUser) {
      navigate('/signin');
      return;
    }
    setIsFormOpen(true);
  };

  const handleCancel = () => {
    shouldRestoreFocusRef.current = true;
    closeForm();
  };

  const handleSave = async () => {
    // La sesión pudo cerrarse con el panel abierto
    if (!currentUser) {
      navigate('/signin');
      return;
    }

    const userId = currentUser._id;
    const trimmedNote = note.trim();
    setIsSaving(true);

    try {
      await saveCat({
        breedId: breed.id,
        breedName: breed.name,
        // 41 de las razas no traen foto: en ese caso se omite el campo
        ...(breed.imageUrl ? { imageUrl: breed.imageUrl } : {}),
        // Una nota vacía no se envía: el servidor la guarda solo si existe
        ...(trimmedNote ? { note: trimmedNote } : {}),
      });
      setSavedByUserId(userId);
      closeForm();
      showNotice(MESSAGES.noticeCatSaved(breed.name));
    } catch (error) {
      // 409: la restricción única del servidor dice que ya estaba guardada
      if (error instanceof ApiError && error.status === 409) {
        setSavedByUserId(userId);
        closeForm();
        showNotice(MESSAGES.noticeCatAlreadySaved(breed.name), 'info');
      } else {
        // El panel sigue abierto para no perder lo escrito
        showNotice(getErrorMessage(error), 'error');
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div ref={containerRef} className="save-cat">
      {isFormOpen ? (
        <div className="save-cat__form">
          <label className="save-cat__label" htmlFor={noteFieldId}>
            {MESSAGES.noteLabel}
          </label>
          <textarea
            id={noteFieldId}
            ref={noteFieldRef}
            className="save-cat__field"
            rows={3}
            value={note}
            maxLength={NOTE_MAX_LENGTH}
            placeholder={MESSAGES.notePlaceholder}
            disabled={isSaving}
            aria-describedby={noteCounterId}
            onChange={(event) => setNote(event.target.value)}
          />
          <p id={noteCounterId} className="save-cat__counter">
            {MESSAGES.noteCounter(note.length, NOTE_MAX_LENGTH)}
          </p>
          <div className="save-cat__actions">
            <Button
              variant="secondary"
              disabled={isSaving}
              aria-label={MESSAGES.saveCatLabel(breed.name)}
              onClick={handleSave}
            >
              {isSaving ? MESSAGES.savingCat : MESSAGES.saveCat}
            </Button>
            <Button
              variant="secondary"
              disabled={isSaving}
              aria-label={MESSAGES.noteCancelLabel(breed.name)}
              onClick={handleCancel}
            >
              {MESSAGES.noteCancel}
            </Button>
          </div>
        </div>
      ) : (
        <Button
          variant="secondary"
          disabled={isSaved}
          aria-label={MESSAGES.saveCatLabel(breed.name)}
          onClick={handleOpenForm}
        >
          {isSaved ? MESSAGES.catSaved : MESSAGES.saveCat}
        </Button>
      )}
    </div>
  );
}

export default SaveCatButton;