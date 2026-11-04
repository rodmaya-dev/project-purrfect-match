// Página /saved: los gatos guardados de la persona con sesión. Muestra carga,
// error y lista vacía, y permite eliminar. App la protege con ProtectedRoute.

import { useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { MESSAGES } from '../../config/messages';
import { NoticeContext } from '../../contexts/NoticeContext';
import { useSavedCats } from '../../hooks/useSavedCats';
import type { SavedCat } from '../../types/savedCat';
import { getErrorMessage } from '../../utils/errors';
import SavedCatCard from '../SavedCatCard/SavedCatCard';
import StatusMessage from '../StatusMessage/StatusMessage';
import '../BreedList/BreedList.css';
import './SavedCats.css';

function SavedCats() {
  const { state, removeCat } = useSavedCats();
  const { showNotice } = useContext(NoticeContext);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [removeError, setRemoveError] = useState<string>('');

  const handleRemove = async (cat: SavedCat) => {
    setRemoveError('');
    setRemovingId(cat._id);

    try {
      await removeCat(cat._id);
      showNotice(MESSAGES.noticeCatRemoved(cat.breedName));
    } catch (error) {
      setRemoveError(getErrorMessage(error));
    } finally {
      setRemovingId(null);
    }
  };

  let content: ReactNode;
  switch (state.status) {
    case 'loading':
      content = (
        <StatusMessage variant="loading" message={MESSAGES.savedCatsLoading} />
      );
      break;
    case 'error':
      content = (
        <StatusMessage variant="error" message={MESSAGES.savedCatsError} />
      );
      break;
    case 'success':
      content =
        state.cats.length === 0 ? (
          <StatusMessage variant="empty" message={MESSAGES.savedCatsEmpty} />
        ) : (
          <ul className="breed-list">
            {state.cats.map((cat) => (
              <li key={cat._id} className="breed-list__item">
                <SavedCatCard
                  cat={cat}
                  isRemoving={removingId === cat._id}
                  onRemove={handleRemove}
                />
              </li>
            ))}
          </ul>
        );
      break;
  }

  return (
    <main className="page saved-cats">
      <h1 className="saved-cats__title">{MESSAGES.savedCatsTitle}</h1>
      {removeError && (
        <div className="saved-cats__alert">
          <StatusMessage variant="error" message={removeError} />
        </div>
      )}
      {content}
    </main>
  );
}

export default SavedCats;