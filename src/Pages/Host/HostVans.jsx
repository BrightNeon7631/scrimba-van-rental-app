import { Suspense } from 'react';
import { 
  useLoaderData, 
  defer, 
  Await 
} from 'react-router-dom';
import HostVan from '../../Components/HostVan';
import { getHostVans } from '../../api';
import { requireAuth } from '../../utils';
import RiseLoader from 'react-spinners/RiseLoader';

export async function loader({ request }) {
  await requireAuth(request);
  return defer({ hostVans: getHostVans() });
}

export default function HostVans() {
  const loaderDataPromise = useLoaderData();

  function renderHostVans(hostVans) {
    const hostVanElements = hostVans.map((element) => {
      return (
        <HostVan
          key={element.id}
          id={element.id}
          path={element.id}
          name={element.name}
          img={element.imageUrl}
          price={element.price}
        />
      );
    });

    return <div className="hostvans--list">{hostVanElements}</div>;
  }

  return (
    <div className="hostvans--container">
      <h1>Your listed vans</h1>
      <Suspense
        fallback={<RiseLoader className="loading" color="#36d7b7" loading />}
      >
        <Await resolve={loaderDataPromise.hostVans}>{renderHostVans}</Await>
      </Suspense>
    </div>
  );
}
