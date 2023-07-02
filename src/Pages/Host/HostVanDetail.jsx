import { useEffect, useState } from "react";
import { Link, useParams, Outlet } from "react-router-dom";
import HostVanDetailNav from "../../Components/HostVanDetailNav";

export default function HostVanDetail() {
    const params = useParams();
    const [hostVan, setHostVan] = useState('');

    useEffect(() => {
        async function getVanData() {
            try {
                const res = await fetch(`/api/vans/${params.id}`);
                if (!res.ok) {
                    console.log('error fetching data');
                    throw res;
                }
                const data = await res.json();
                setHostVan(data.vans);
            } catch (error) {
                console.log(error);
            }
        }
        getVanData();
    }, [params.id])

    return (
        <>
            <div className="van--detail--link">
                <Link to=".." relative="path">← Back to all vans</Link>
            </div>
            {hostVan ? <div className="hostvan--detail--container">
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
            </div> : <h2 className="loading">Loading...</h2>}
        </>
    )
}