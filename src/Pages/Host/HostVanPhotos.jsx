import { useOutletContext } from "react-router-dom";
export default function HostVanPhotos() {
    const { hostVan } = useOutletContext();
    return (
        <div className="hostvan--detail--photos">
            <img src={hostVan.imageUrl} />
        </div>
    )
}