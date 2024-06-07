import { 
    useEffect, 
    useState 
} from "react";
import { 
    Link, 
    useParams, 
    useLocation 
} from "react-router-dom";
import { getVan } from "../../api";
import RiseLoader from "react-spinners/RiseLoader";

export default function VanDetail() {
    const params = useParams();
    const location = useLocation();
    const [van, setVan] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
      async function loadVan() {
        setError(null);
        setLoading(true);
        try {
            const data = await getVan(params.id);
            setVan(data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
      }
      loadVan();
    }, [params.id]);

    const search = location.state?.search || '';
    const type = location.state?.type || 'all';

    if (loading) {
        return <RiseLoader className="loading" color="#36d7b7" loading />
    }

    if (error) {
        return <h2 className='"error--container'>There was an error: {error.message}</h2>
    }

    return (
        <>
            <div className="van--detail--link">
                <Link to={`..${search}`} relative="path">← Back to {type} vans</Link>
            </div>
            <div className="van--detail--container">
                <img className="van--detail--img" src={van.imageUrl}/>
                <div className={`van--detail--type ${van.type === 'simple' ? 'simple' : ''} ${van.type === 'rugged' ? 'rugged' : ''} ${van.type === 'luxury' ? 'luxury' : ''}`}>{van.type}</div>
                <h1>{van.name}</h1>
                <div className="van--detail--price">${van.price}<span>/day</span></div>
                <div className="van--detail--bottom">
                    <p>{van.description}</p>
                    <button className="van--detail--button">Rent this van</button>
                </div>
            </div>
        </>
    )
}