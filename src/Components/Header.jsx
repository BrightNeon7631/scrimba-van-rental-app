import { NavLink, Link } from "react-router-dom";
import { RiAccountCircleLine } from 'react-icons/ri';

export default function Header() {
    return (
      <header>
        <Link className="nav--home" to="/">#VANLIFE</Link>
        <div className="nav--right">
          <NavLink 
            to="/host" 
            className={({isActive}) => isActive ? 'active--link' : ''}
          >
            Host
          </NavLink>
          <NavLink 
            to="/about" 
            className={({isActive}) => isActive ? 'active--link' : ''}
          >
            About
          </NavLink>
          <NavLink 
            to="/vans" 
            className={({isActive}) => isActive ? 'active--link' : ''}
          >
            Vans
          </NavLink>
          <NavLink 
            to="/login" 
            className={({isActive}) => isActive ? 'active--link' : ''}
          >
            <RiAccountCircleLine className="icon"/>
          </NavLink>
        </div>
      </header>
    );
}