import { NavLink, Link } from "react-router-dom";

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
        </div>
      </header>
    );
}