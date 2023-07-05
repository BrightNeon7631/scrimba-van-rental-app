/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
export default function Van(props) {
    return (
        <div className="van">
            <Link
                className="van--link"
                id={props.id}
                key={props.id}
                to={props.id}
                state={props.searchState}
            >
                <img src={props.img}/>
                <div className="van--info">
                    <div>{props.name}</div>
                    <div className="van--price">
                        <div>${props.price}</div>
                        <div className="van--price--day">/day</div>
                    </div>
                    <div className={`van--type ${props.type === 'simple' ? 'simple' : ''} ${props.type === 'rugged' ? 'rugged' : ''} ${props.type === 'luxury' ? 'luxury' : ''}`}>{props.type}</div>
                </div>
            </Link>
        </div>
    )
}