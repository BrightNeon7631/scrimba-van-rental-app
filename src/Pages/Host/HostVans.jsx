import HostVan from "../../Components/HostVan";
import { useLoaderData } from "react-router-dom";
import { getHostVans } from "../../api";
import { requireAuth } from "../../utils";

export async function loader({ request }) {
  await requireAuth(request);
  return getHostVans();
}

export default function HostVans() {
    const hostVans = useLoaderData();

      const hostVanElements = hostVans.map((element) => {
        return (
          <HostVan 
            key={element.id} 
            id={element.id} 
            name={element.name} 
            img={element.imageUrl} 
            price={element.price} 
          />
        )
      }) 

    return (
        <div className="hostvans--container">
            <h1>Your listed vans</h1>
            <div className="hostvans--list">
                {hostVanElements}
            </div>
        </div>
    )
}