import { useEffect, useState } from 'react';
import Van from '../../Components/Van';
import { useSearchParams } from 'react-router-dom';

export default function Vans() {
  const [vanData, setVanData] = useState('');
  const [uniqueTypes, setUniqueTypes] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  
  const typeFilter = searchParams.get('type');

  useEffect(() => {
    async function getVans() {
      try {
        const res = await fetch('api/vans');
        if (!res.ok) {
          console.log('error fetching data');
          throw res;
        }
        const data = await res.json();
        setVanData(data.vans);
      } catch (error) {
        console.log(error);
      }
    }
    getVans();
  }, []);

  const displayedVans = (vanData && typeFilter) ? vanData.filter(van => van.type === typeFilter) : vanData;

  useEffect(() => {
    vanData &&
      setUniqueTypes([...new Set(vanData.map((item) => item.type))]);
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
          searchState={{search: `?${searchParams.toString()}`, type: typeFilter}}
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
          onClick={() => setSearchParams({type: `${type}`})}
        >
          {type}
        </div>
      );
    });

  return (
    <div className="vans--container">
      <h1>Explore our van options</h1>
      <div className="vans--types">
        {vanTypes}
        {typeFilter && <div
          className="vans--types--clear"
          onClick={() => setSearchParams({})}
          >
          Clear filters
        </div>}
      </div>
      <div className="vans--list">{vanElements}</div>
    </div>
  );
}