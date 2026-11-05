import { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { MESSAGES } from '../../config/messages';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { NoticeContext } from '../../contexts/NoticeContext';
import { removeToken } from '../../utils/token';
import { getHeaderName } from '../../utils/userName';
import Button from '../Button/Button';
import './Header.css';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { currentUser, setCurrentUser, isCheckingSession } =
    useContext(CurrentUserContext);
  const { showNotice } = useContext(NoticeContext);
  const navigate = useNavigate();

  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen((isOpen) => !isOpen);

  const handleSignIn = () => {
    closeMenu();
    navigate('/signin');
  };

  const handleSignOut = () => {
    removeToken();
    setCurrentUser(null);
    showNotice(MESSAGES.noticeSignedOut, 'info');
    closeMenu();
    navigate('/');
  };

  return (
    <header className={`header ${isMenuOpen ? 'header_menu-open' : ''}`}>
      <div className="header__bar">
        <Link to="/" className="header__logo" onClick={closeMenu}>
          PurrfectMatch
        </Link>
        <button
          type="button"
          className="header__menu-button"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          aria-controls="main-navigation"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="32" height="18" viewBox="0 0 32 18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M0 1h32M0 9h32M0 17h32" />
            </svg>
          )}
        </button>
      </div>
      <nav id="main-navigation" className="header__nav" aria-label="Main">
        <NavLink to="/" end className="header__link" onClick={closeMenu}>
          Home
        </NavLink>
        <NavLink to="/about" className="header__link" onClick={closeMenu}>
          About the author
        </NavLink>
        {/* Mientras se valida el token guardado no se muestra ningún estado de sesión */}
        {!isCheckingSession && currentUser && (
          <>
            <NavLink to="/saved" className="header__link" onClick={closeMenu}>
              {MESSAGES.headerSavedCats(getHeaderName(currentUser.name))}
            </NavLink>
            <button
              type="button"
              className="header__link header__link_button"
              onClick={handleSignOut}
            >
              {MESSAGES.headerSignOut}
            </button>
          </>
        )}
        {!isCheckingSession && !currentUser && (
          <div className="header__auth">
            <Button onClick={handleSignIn}>{MESSAGES.headerSignIn}</Button>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;