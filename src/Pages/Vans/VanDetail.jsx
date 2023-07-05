import { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";

export default function VanDetail() {
    const params = useParams();
    const location = useLocation();
    const [van, setVan] = useState('');

    useEffect(() => {
        async function getVanData() {
            try {
                const res = await fetch(`/api/vans/${params.id}`);
                if (!res.ok) {
                    console.log('error fetching data');
                    throw res;
                }
                const data = await res.json();
                setVan(data.vans);
            } catch (error) {
                console.log(error);
            }
        }
        getVanData();
    }, [params.id])

    const search = location.state?.search || '';
    console.log(search);

    return (
        <>
            <div className="van--detail--link">
                <Link to={`..${search}`} relative="path">← Back to all vans</Link>
            </div>
            {van ? <div className="van--detail--container">
                <img className="van--detail--img" src={van.imageUrl}/>
                <div className={`van--detail--type ${van.type === 'simple' ? 'simple' : ''} ${van.type === 'rugged' ? 'rugged' : ''} ${van.type === 'luxury' ? 'luxury' : ''}`}>{van.type}</div>
                <h1>{van.name}</h1>
                <div className="van--detail--price">${van.price}<span>/day</span></div>
                <div className="van--detail--bottom">
                    <p>{van.description}</p>
                    <button className="van--detail--button">Rent this van</button>
                </div>
            </div> : <h2 className="loading">Loading...</h2>}
        </>
    )
}