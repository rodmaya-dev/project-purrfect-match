import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">
        © 2026 PurrfectMatch. Breed data from{' '}
        <a
          className="footer__link"
          href="https://thecatapi.com"
          target="_blank"
          rel="noreferrer"
        >
          The Cat API
        </a>
        .
      </p>
    </footer>
  );
}

export default Footer;