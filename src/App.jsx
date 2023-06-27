import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Vans from './Pages/Vans';
import VanDetail from './Pages/VanDetail';
import './server';


function App() {

  return (
    <BrowserRouter>
      <nav>
        <Link className="nav--home" to="/">
          #VANLIFE
        </Link>
        <div className="nav--right">
          <Link to="/about">About</Link>
          <Link to="/vans">Vans</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/vans" element={<Vans />} />
        <Route path="/vans/:id" element={<VanDetail />} />
      </Routes>
      {/* <footer>©2023 #VANLIFE</footer> */}
    </BrowserRouter>
  );
}

export default App
