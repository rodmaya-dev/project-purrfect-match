// Botón "Save" de las tarjetas de raza. Sin sesión lleva a /signin; con sesión
// guarda la raza en la API propia y avisa del resultado. Lo renderiza BreedCard.

import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MESSAGES } from '../../config/messages';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { NoticeContext } from '../../contexts/NoticeContext';
import type { Breed } from '../../types/breed';
import { ApiError, saveCat } from '../../utils/api';
import { getErrorMessage } from '../../utils/errors';
import Button from '../Button/Button';

interface SaveCatButtonProps {
  breed: Breed;
}

function SaveCatButton({ breed }: SaveCatButtonProps) {
  const { currentUser } = useContext(CurrentUserContext);
  const { showNotice } = useContext(NoticeContext);
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState<boolean>(false);
  // Se guarda quién la guardó: si cambia la sesión, el botón vuelve a "Save"
  const [savedByUserId, setSavedByUserId] = useState<string | null>(null);

  const isSaved = currentUser !== null && savedByUserId === currentUser._id;

  const handleClick = async () => {
    if (!currentUser) {
      navigate('/signin');
      return;
    }

    const userId = currentUser._id;
    setIsSaving(true);

    try {
      await saveCat({
        breedId: breed.id,
        breedName: breed.name,
        // 41 de las razas no traen foto: en ese caso se omite el campo
        ...(breed.imageUrl ? { imageUrl: breed.imageUrl } : {}),
      });
      setSavedByUserId(userId);
      showNotice(MESSAGES.noticeCatSaved(breed.name));
    } catch (error) {
      // 409: la restricción única del servidor dice que ya estaba guardada
      if (error instanceof ApiError && error.status === 409) {
        setSavedByUserId(userId);
        showNotice(MESSAGES.noticeCatAlreadySaved(breed.name), 'info');
      } else {
        showNotice(getErrorMessage(error), 'error');
      }
    } finally {
      setIsSaving(false);
    }
  };

  let label: string = MESSAGES.saveCat;
  if (isSaving) {
    label = MESSAGES.savingCat;
  }
  if (isSaved) {
    label = MESSAGES.catSaved;
  }

  return (
    <Button
      variant="secondary"
      disabled={isSaving || isSaved}
      aria-label={MESSAGES.saveCatLabel(breed.name)}
      onClick={handleClick}
    >
      {label}
    </Button>
  );
}

export default SaveCatButton;