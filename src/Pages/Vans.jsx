import { useEffect, useState } from "react";
import Van from "../Components/Van";

export default function Vans() {
    const [vanDataAPI, setVanDataAPI] = useState('');
    const [vanData, setVanData] = useState('');
    const [uniqueTypes, setUniqueTypes] = useState('');
    const [selectedType, setSelectedType] = useState('');
    
    useEffect(() => {
        async function getVans() {
            try {
                const res = await fetch('api/vans');
                if (!res.ok) {
                    console.log('error fetching data');
                    throw res;
                }
                const data = await res.json();
                setVanDataAPI(data.vans);
                setVanData(data.vans);
            } catch (error) {
                console.log(error);
            }
        }
        getVans();
    }, [])

    useEffect(() => {
        vanDataAPI && setUniqueTypes([...new Set(vanDataAPI.map(item => item.type))]);
    }, [vanDataAPI])

    const vanElements = vanData && vanData.map((element) => {
        return (
          <Van
            key={element.id}
            id={element.id}
            img={element.imageUrl}
            description={element.description}
            name={element.name}
            price={element.price}
            type={element.type}
          />
        );
      });

      function handleTypeClick(e) {
        const { id } = e.target;
        setSelectedType(id);
        setVanData(vanDataAPI.filter((element) => element.type === id));
      }

      const vanTypes = uniqueTypes && uniqueTypes.map((type) => {
        return (
          <div
            key={type}
            id={type}
            className={`type ${selectedType === type ? 'selected--type' : ''}`}
            onClick={handleTypeClick}
          >
            {type}
          </div>
        );
      })

      function clearTypes() {
        setSelectedType('');
        setVanData(vanDataAPI);
      }

    return (
      <div className="vans--container">
        <h1>Explore our van options</h1>
        <div className="vans--types">
          {vanTypes}
          <a onClick={clearTypes}>Clear filters</a>
        </div>
        <div className="vans--list">{vanElements}</div>
      </div>
    )
}