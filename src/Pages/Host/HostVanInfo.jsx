import { useOutletContext } from "react-router-dom";
export default function HostVanInfo() {
    const { hostVan } = useOutletContext();
    return (
        <div className="hostvan--detail--details">
            <div className="hotvan--detail--details--element">
                <h3>Name: </h3>
                <div>{hostVan.name}</div>
            </div>
            <div className="hotvan--detail--details--element">
                <h3>Category: </h3>
                <div>{hostVan.type[0].toUpperCase() + hostVan.type.slice(1)}</div>
            </div>
            <div className="hotvan--detail--details--element">
                <h3>Description: </h3>
                <div>{hostVan.description}</div>
            </div>
            <div className="hotvan--detail--details--element">
                <h3>Visibility: </h3>
                <div>Public</div>
            </div>
        </div>
    )
}