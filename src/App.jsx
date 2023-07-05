import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Vans from './Pages/Vans/Vans';
import VanDetail from './Pages/Vans/VanDetail';
import Dashboard from './Pages/Host/Dashboard';
import Income from './Pages/Host/Income';
import Reviews from './Pages/Host/Reviews';
import HostVans from './Pages/Host/HostVans';
import HostVanDetail from './Pages/Host/HostVanDetail';
import Layout from './Components/Layout';
import HostLayout from './Components/HostLayout';
import HostVanInfo from './Pages/Host/HostVanInfo';
import HostVanPricing from './Pages/Host/HostVanPricing';
import HostVanPhotos from './Pages/Host/HostVanPhotos';
import NotFound from './Pages/NotFound';
import './server';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="vans" element={<Vans />} />
          <Route path="vans/:id" element={<VanDetail />} />
          
          <Route path="host" element={<HostLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="income" element={<Income />} />
            <Route path="vans" element={<HostVans />} />
            <Route path="vans/:id" element={<HostVanDetail />}>
              <Route index element={<HostVanInfo />}/>
              <Route path="pricing" element={<HostVanPricing />}/>
              <Route path="photos" element={<HostVanPhotos />}/>
            </Route>
            <Route path="reviews" element={<Reviews />} />
          </Route>
          
          <Route path="*" element={<NotFound />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App