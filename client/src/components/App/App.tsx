import { Route, Routes } from 'react-router-dom';
import { useBreeds } from '../../hooks/useBreeds';
import About from '../About/About';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Main from '../Main/Main';

function App() {
  // Vive aquí y no en Main para pedir las razas una sola vez: Main se
  // desmonta al ir a "/about", pero App no.
  const breedsState = useBreeds();

  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Main breedsState={breedsState} />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;