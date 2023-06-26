import { useEffect, useState } from "react";
import Van from "../Components/Van";

export default function Vans() {
    const [vanData, setVanData] = useState('');
    const [types, setTypes] = useState('');
    console.log(vanData);
    console.log(types);
    
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
                throw new Error;
            }
        }
        getVans();
    }, [])

    useEffect(() => {
        vanData && setTypes([...new Set(vanData.map(item => item.type))]);
    }, [vanData])

    const vanElements = vanData && vanData.map((element) => {
        return (
          <Van
            key={element.id}
            img={element.imageUrl}
            description={element.description}
            name={element.name}
            price={element.price}
            type={element.type}
          />
        );
      });

      const vanTypes = types && types.map((type, index) => {
        return (
            <div key={index} className="type--option">{type}</div>
        )
      })

    return (
      <div className="vans--container">
        <h1>Explore our van options</h1>
        <div className="vans--options">
          {vanTypes}
          <a>Clear filters</a>
        </div>
        <div className="vans--all">{vanElements}</div>
      </div>
    );
}