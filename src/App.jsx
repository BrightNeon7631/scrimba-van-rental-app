import { 
  Route, 
  RouterProvider, 
  createBrowserRouter, 
  createRoutesFromElements 
} from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Vans from './Pages/Vans/Vans';
import VanDetail from './Pages/Vans/VanDetail';
import Dashboard from './Pages/Host/Dashboard';
import Income from './Pages/Host/Income';
import Reviews from './Pages/Host/Reviews';
import HostVans, { loader as hostVansLoader } from './Pages/Host/HostVans';
import HostVanDetail, { loader as HostVanDetailLoader } from './Pages/Host/HostVanDetail';
import Layout from './Components/Layout';
import HostLayout from './Components/HostLayout';
import HostVanInfo from './Pages/Host/HostVanInfo';
import HostVanPricing from './Pages/Host/HostVanPricing';
import HostVanPhotos from './Pages/Host/HostVanPhotos';
import NotFound from './Pages/NotFound';
import Login from './Pages/Login';
import Error from './Components/Error';
import './server';

const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="vans" element={<Vans />} />
      <Route path="vans/:id" element={<VanDetail />} />
      <Route path="login" element={<Login />} />

      <Route path="host" element={<HostLayout />} >
        <Route index element={<Dashboard />} loader={async () => { return null }}/>
        <Route path="income" element={<Income />} loader={async () => { return null }}/>
        <Route path="vans" element={<HostVans />} loader={hostVansLoader} errorElement={<Error />}/>
        <Route path="vans/:id" element={<HostVanDetail />} loader={HostVanDetailLoader} errorElement={<Error />}>
          <Route index element={<HostVanInfo />} loader={async () => { return null }}/>
          <Route path="pricing" element={<HostVanPricing />} loader={async () => { return null }}/>
          <Route path="photos" element={<HostVanPhotos />} loader={async () => { return null }}/>
        </Route>
        <Route path="reviews" element={<Reviews />} loader={async () => { return null }}/>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App