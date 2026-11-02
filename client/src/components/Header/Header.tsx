import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen((isOpen) => !isOpen);

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
      </nav>
    </header>
  );
}

export default Header;