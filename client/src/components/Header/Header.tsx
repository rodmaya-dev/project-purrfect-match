import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <NavLink to="/" className="header__logo">
        PurrfectMatch
      </NavLink>
      <nav className="header__nav">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/about">About the author</NavLink>
      </nav>
    </header>
  );
}

export default Header;