import { useOutletContext } from "react-router-dom";
export default function HostVanPricing() {
    const { hostVan } = useOutletContext();
    return (
        <h1 className="hostvan--detail--pricing">${hostVan.price}<span>/day</span></h1>
    )
}