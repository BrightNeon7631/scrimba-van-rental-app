import { Outlet } from "react-router-dom";
import Header from '../Components/Header';
import Footer from "./Footer";

export default function Layout() {
    return (
      <div className="site--layout">
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}