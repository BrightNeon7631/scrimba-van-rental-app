/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
export default function HostVanDetailNav() {
    const activeStyle = {
        fontWeight: 'bold',
        textDecoration: 'underline',
        color: '#161616'
    }
    return (
        <div className="host--layout--nav hostvan--detail--layout--nav">
            <NavLink 
              to='.'
              end
              style={({isActive}) => isActive ? activeStyle : null}
            >
              Details
            </NavLink>
            <NavLink 
              to='pricing'
              style={({isActive}) => isActive ? activeStyle : null}
              >
              Pricing
            </NavLink>
            <NavLink 
              to='photos'
              style={({isActive}) => isActive ? activeStyle : null}
              >Photos
            </NavLink>
        </div>
    )
}