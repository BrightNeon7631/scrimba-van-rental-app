import { NavLink, Link, useNavigate } from "react-router-dom";
import { RiAccountCircleLine } from 'react-icons/ri';

export default function Header() {
  const navigate = useNavigate();

  function fakeLogOut() {
    localStorage.removeItem('loggedIn');
    navigate('/');
  }

  function isLoggedIn() {
    return localStorage.getItem('loggedIn');
  }
  
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
          {!isLoggedIn() ? <NavLink 
            to="/login" 
            className={({isActive}) => isActive ? 'active--link' : ''}
          >
            <RiAccountCircleLine className="icon"/>
          </NavLink>
          : <a className="logout" onClick={fakeLogOut}>Logout</a>}
        </div>
      </header>
    );
}