import {Link, useLocation} from "react-router-dom";
import {AiOutlineHome,AiOutlineShoppingCart,AiOutlineHeart} from "react-icons/ai"

export const Navbar:React.FC = () => {
    const location = useLocation();
    const isActive = (path:string):string =>{
        return location.pathname === path?"navbar__item active":"navbar__item";
    }
    return <nav className="navbar">
        <Link to="/">
            <nav className={isActive("/")}>
                <AiOutlineHome/>
            </nav>
        </Link>       
        <Link to="/cart">
            <nav className={isActive("/cart")}>
                <AiOutlineShoppingCart/>
            </nav>
        </Link>       
        <Link to="/saved">
            <nav className={isActive("/saved")}>
                <AiOutlineHeart/>
            </nav>
        </Link>       
    </nav>
}