import { RiAccountCircleLine } from 'react-icons/ri';
import { onAuthStateChanged } from 'firebase/auth';
import {
  useEffect,
  useState
} from 'react';
import {
  NavLink,
  Link,
  useNavigate
} from 'react-router-dom';
import {
  logoutUser,
  auth
} from '../api';

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
      const unsub = onAuthStateChanged(auth, (user) => {
        if (user) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      });

      return () => {
        unsub();
      };
    }, []);

    const navigate = useNavigate();

    async function logOut() {
      await logoutUser();
      navigate('/');
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
          {!isLoggedIn ? <NavLink 
            to="/login" 
            className={({isActive}) => isActive ? 'active--link' : ''}
          >
            <RiAccountCircleLine className="icon"/>
          </NavLink>
          : <a className="logout" onClick={logOut}>Logout</a>}
        </div>
      </header>
    );
}