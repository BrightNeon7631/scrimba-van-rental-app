import { Suspense } from 'react';
import { 
    Link, 
    defer, 
    Await, 
    useLoaderData 
} from 'react-router-dom';
import { getHostVans } from '../../api';
import { requireAuth } from '../../utils';
import { BsStarFill } from 'react-icons/bs'
import HostVan from '../../Components/HostVan';

export async function loader({ request }) {
    await requireAuth(request);
    return defer({ hostVans: getHostVans() });
}

export default function Dashboard() {
    const loaderDataPromise = useLoaderData();

    function renderHostVans(hostVans) {
        const hostVanElements = hostVans.map((element) => {
          return (
            <HostVan
              key={element.id}
              id={element.id}
              path={`vans/${element.id}`}
              name={element.name}
              img={element.imageUrl}
              price={element.price}
            />
          );
        });
    
        return <div className="hostvans--list--dashboard">{hostVanElements}</div>;
    }

    return (
        <>
            <section className="host-dashboard-earnings">
                <div className="info">
                    <h1>Welcome!</h1>
                    <p>Income last <span>30 days</span></p>
                    <h2>$2,260</h2>
                </div>
                <Link to="income">Details</Link>
            </section>
            <section className="host-dashboard-reviews">
                <h2>Review score</h2>
                <BsStarFill className="star" />
                <p>
                    <span>5.0</span>/5
                </p>
                <Link to="reviews">Details</Link>
            </section>
            <section className="host-dashboard-vans">
                <div className="top">
                    <h2>Your listed vans</h2>
                    <Link to="vans">View all</Link>
                </div>
                <Suspense fallback={<h3>Loading...</h3>}>
                    <Await resolve={loaderDataPromise.hostVans}>{renderHostVans}</Await>
                </Suspense>
            </section>
        </>
    )
}