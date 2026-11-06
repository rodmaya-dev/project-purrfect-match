import { Route, Routes } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { NoticeContext } from '../../contexts/NoticeContext';
import { useBreeds } from '../../hooks/useBreeds';
import { useNotice } from '../../hooks/useNotice';
import { useSession } from '../../hooks/useSession';
import About from '../About/About';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Main from '../Main/Main';
import Notice from '../Notice/Notice';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Register from '../Register/Register';
import SavedCats from '../SavedCats/SavedCats';

function App() {
  // Vive aquí y no en Main para pedir las razas una sola vez: Main se
  // desmonta al ir a "/about", pero App no.
  const breedsState = useBreeds();
  const session = useSession();
  const { notice, dismissNotice, contextValue } = useNotice();

  return (
    <CurrentUserContext.Provider value={session}>
      <NoticeContext.Provider value={contextValue}>
        <div className="app">
          <Header />
          <Routes>
            <Route path="/" element={<Main breedsState={breedsState} />} />
            <Route path="/about" element={<About />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/signin" element={<Login />} />
            <Route
              path="/saved"
              element={
                <ProtectedRoute>
                  <SavedCats />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
          <Notice notice={notice} onClose={dismissNotice} />
        </div>
      </NoticeContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;