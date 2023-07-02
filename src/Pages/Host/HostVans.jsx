import { useState, useEffect } from "react";
import HostVan from "../../Components/HostVan"

export default function HostVans() {
    const [hostVans, setHostVans] = useState([]);
    console.log(hostVans);

    useEffect(() => {
        async function getHostVans() {
          try {
            const res = await fetch(`/api/host/vans`);
            if (!res.ok) {
              console.log('error fetching data');
              throw res;
            }
            const data = await res.json();
            setHostVans(data.vans);
            setHostVans(data.vans);
          } catch (error) {
            console.log(error);
          }
        }
        getHostVans();
      }, []);

      const hostVanElements = hostVans && hostVans.map((element) => {
        return (
        <HostVan key={element.id} id={element.id} name={element.name} img={element.imageUrl} price={element.price} />
        )
      }) 

    return (
        <div className="hostvans--container">
            <h1>Your listed vans</h1>
            <div className="hostvans--list">
                {hostVans.length > 0 ? hostVanElements : <h2 className="loading">Loading...</h2>}
            </div>
        </div>
    )
}