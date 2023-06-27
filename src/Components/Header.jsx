import { Link } from "react-router-dom";

export default function Header() {
    return (
      <header>
        <Link className="nav--home" to="/">#VANLIFE</Link>
        <div className="nav--right">
          <Link to="/about">About</Link>
          <Link to="/vans">Vans</Link>
        </div>
      </header>
    );
}