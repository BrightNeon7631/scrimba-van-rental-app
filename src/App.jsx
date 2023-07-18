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
import Dashboard, { loader as dashboardLoader } from './Pages/Host/Dashboard';
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
import Login, { loader as loginLoader, action as loginAction } from './Pages/Login';
import Error from './Components/Error';
import { requireAuth } from './utils';

const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="vans" element={<Vans />} errorElement={<Error />}/>
      <Route path="vans/:id" element={<VanDetail />} errorElement={<Error />}/>
      <Route path="login" element={<Login />} loader={loginLoader} action={loginAction} />

      <Route path="host" element={<HostLayout />} >
        <Route index element={<Dashboard />} loader={dashboardLoader}/>
        <Route path="income" element={<Income />} loader={async ({request}) => await requireAuth(request)}/>
        <Route path="vans" element={<HostVans />} loader={hostVansLoader} errorElement={<Error />}/>
        <Route path="vans/:id" element={<HostVanDetail />} loader={HostVanDetailLoader} errorElement={<Error />}>
          <Route index element={<HostVanInfo />} loader={async ({request}) => await requireAuth(request)}/>
          <Route path="pricing" element={<HostVanPricing />} loader={async ({request}) => await requireAuth(request)}/>
          <Route path="photos" element={<HostVanPhotos />} loader={async ({request}) => await requireAuth(request)}/>
        </Route>
        <Route path="reviews" element={<Reviews />} loader={async ({request}) => await requireAuth(request)}/>
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