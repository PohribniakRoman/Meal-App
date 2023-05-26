import {Link} from "react-router-dom";

export const Navbar:React.FC = () => {
    return <nav className="nav">
        <Link to="/">
            <nav className="nav__item">
                Shop
            </nav>
        </Link>       
        <Link to="/cart">
            <nav className="nav__item">
                Cart
            </nav>
        </Link>       
    </nav>
}