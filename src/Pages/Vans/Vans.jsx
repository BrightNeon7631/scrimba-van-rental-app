import { 
  useEffect, 
  useState 
} from 'react';
import { useSearchParams } from 'react-router-dom';
import Van from '../../Components/Van';
import { getVans } from '../../api';
import RiseLoader from 'react-spinners/RiseLoader';

export default function Vans() {
  const [vanData, setVanData] = useState([]);
  const [uniqueTypes, setUniqueTypes] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const typeFilter = searchParams.get('type');

  useEffect(() => {
    async function loadVans() {
      setError(null);
      setLoading(true);
      try {
        const data = await getVans();
        setVanData(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    loadVans();
  }, []);

  const displayedVans =
    vanData && typeFilter
      ? vanData.filter((van) => van.type === typeFilter)
      : vanData;

  useEffect(() => {
    vanData && setUniqueTypes([...new Set(vanData.map((item) => item.type))]);
  }, [vanData]);

  const vanElements =
    displayedVans &&
    displayedVans.map((element) => {
      return (
        <Van
          key={element.id}
          id={element.id}
          img={element.imageUrl}
          description={element.description}
          name={element.name}
          price={element.price}
          type={element.type}
          searchState={{
            search: `?${searchParams.toString()}`,
            type: typeFilter,
          }}
        />
      );
    });

  const vanTypes =
    uniqueTypes &&
    uniqueTypes.map((type) => {
      return (
        <div
          key={type}
          id={type}
          className={`type ${typeFilter === type ? 'selected--type' : ''}`}
          onClick={() => setSearchParams({ type: `${type}` })}
        >
          {type}
        </div>
      );
    });

  if (loading) {
    return <RiseLoader className="loading" color="#36d7b7" loading />;
  }

  if (error) {
    return (
      <h2 className='"error--container'>There was an error: {error.message}</h2>
    );
  }

  return (
    <div className="vans--container">
      <h1>Explore our van options</h1>
      <div className="vans--types">
        {vanTypes}
        {typeFilter && (
          <div
            className="vans--types--clear"
            onClick={() => setSearchParams({})}
          >
            Clear filters
          </div>
        )}
      </div>
      <div className="vans--list">{vanElements}</div>
    </div>
  );
}