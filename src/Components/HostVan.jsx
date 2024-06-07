/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
export default function HostVan(props) {
    return (
        <Link className='hostvan--link' key={props.id} to={props.path}>
            <img src={props.img} />
            <div className="hostvan--info">
                <div className="hostvan--name">{props.name}</div>
                <div className="hostvan--price">${props.price}/day</div>
            </div>
        </Link>
    )
}