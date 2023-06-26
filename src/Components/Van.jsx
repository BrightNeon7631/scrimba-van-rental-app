/* eslint-disable react/prop-types */
export default function Van(props) {
    return (
        <div className="van">
            <img src={props.img}/>
            <div className="van--info">
                <div>{props.name}</div>
                <div className="van--price">
                    <div>${props.price}</div>
                    <div className="van--price--day">/day</div>
                </div>
                <div className={`van--type ${props.type === 'simple' ? 'simple' : ''} ${props.type === 'rugged' ? 'rugged' : ''} ${props.type === 'luxury' ? 'luxury' : ''}`}>{props.type}</div>
            </div>
        </div>
    )
}