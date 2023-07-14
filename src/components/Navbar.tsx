import {Link, useLocation} from "react-router-dom";
import {AiOutlineHome,AiOutlineShoppingCart,AiOutlineHeart, AiFillGithub} from "react-icons/ai"
import {MdKeyboardDoubleArrowUp} from "react-icons/md"
import { Search } from "./Search/Search";
import { Typography } from "@mui/material";
import { useState } from "react";

export const Navbar:React.FC = () => {
    const [isMenuOpened,setMenuOpened] = useState<boolean>(false);
    const location = useLocation();
    const isActive = (path:string):string =>{
        return location.pathname === path?"navbar__item active":"navbar__item";
    }
    return <nav className="navbar">
        <Search/>
        <div className={`navbar__menu ${isMenuOpened?"opened":""}`}>
            <Link to="/">
                <nav className={isActive("/")}>
                    <AiOutlineHome/><Typography className="navbar__menu--label">Shop</Typography>
                </nav>
            </Link>       
            <Link to="/cart">
                <nav className={isActive("/cart")}>
                    <AiOutlineShoppingCart/><Typography className="navbar__menu--label">Cart</Typography>
                </nav>
            </Link>       
            <Link to="/saved">
                <nav className={isActive("/saved")}>
                    <AiOutlineHeart/><Typography className="navbar__menu--label">Saved</Typography>
                </nav>
            </Link>
        </div>
        <div className={`navbar__trigger ${isMenuOpened?"opened":""}`} onClick={()=>{setMenuOpened(!isMenuOpened)}}>
        <MdKeyboardDoubleArrowUp/>
        </div> 
        <Link className="navbar__link" to="https://github.com/PohribniakRoman" target="_blank">
            <AiFillGithub/>
        </Link>
    </nav>
}