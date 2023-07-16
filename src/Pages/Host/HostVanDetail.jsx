import { Suspense } from "react";
import { 
    Link, 
    Outlet, 
    useLoaderData,
    Await,
    defer
} from "react-router-dom";
import HostVanDetailNav from "../../Components/HostVanDetailNav";
import { getHostVans } from "../../api";
import { requireAuth } from "../../utils";

export async function loader({ params, request }) {
    await requireAuth(request);
    return defer({ hostVan: getHostVans(params.id) });
}

export default function HostVanDetail() {
    const loaderDataPromise = useLoaderData();
    console.log(loaderDataPromise);

    function renderHostVan(hostVan) {
        console.log(hostVan);
        return (
            <div className="hostvan--detail--container">
                <div className="hostvan--detail">
                    <div className="hostvan--detail--top">
                        <img src={hostVan.imageUrl}/>
                        <div className="hostvan--detail--info">
                            <div className={`van--detail--type ${hostVan.type === 'simple' ? 'simple' : ''} ${hostVan.type === 'rugged' ? 'rugged' : ''} ${hostVan.type === 'luxury' ? 'luxury' : ''}`}>{hostVan.type}</div>
                            <div className="hostvan--detail--name">{hostVan.name}</div>
                            <div className="hostvan--detail--price">${hostVan.price}<span>/day</span></div>
                        </div>
                    </div>
                    <HostVanDetailNav />
                    <Outlet context={{ hostVan }} />
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="van--detail--link">
                <Link to=".." relative="path">← Back to all vans</Link>
            </div>
            <Suspense fallback={<h2 className="loading">Loading van...</h2>}>
                <Await resolve={loaderDataPromise.hostVan}>
                    {renderHostVan}
                </Await>
            </Suspense>
        </>
    )
}