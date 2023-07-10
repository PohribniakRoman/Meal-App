import {Link, useLocation} from "react-router-dom";
import {AiOutlineHome,AiOutlineShoppingCart,AiOutlineHeart, AiFillGithub} from "react-icons/ai"
import { Search } from "./Search/Search";

export const Navbar:React.FC = () => {
    const location = useLocation();
    const isActive = (path:string):string =>{
        return location.pathname === path?"navbar__item active":"navbar__item";
    }
    return <nav className="navbar">
        <Search/>
        <div className="navbar__menu">
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
        </div>
            <Link to="https://github.com/PohribniakRoman" target="_blank">
            <div className="navbar__link">
                    <AiFillGithub/>
            </div>       
            </Link>
    </nav>
}