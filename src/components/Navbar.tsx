import {Link} from "react-router-dom";

export const Navbar:React.FC = () => {
    return <nav className="nav">
        <Link to="/">
            <nav className="nav__item">
                Home
            </nav>
        </Link>       
    </nav>
}