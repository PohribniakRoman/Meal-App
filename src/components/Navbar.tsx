import {Link, useLocation} from "react-router-dom";
import {AiOutlineHome,AiOutlineShoppingCart,AiOutlineHeart, AiFillGithub} from "react-icons/ai"
import {MdKeyboardDoubleArrowUp} from "react-icons/md"
import { Typography } from "@mui/material";
import { useState } from "react";
import { SearchModal } from "./Search/SearchModal";
import { BiSearchAlt2 } from "react-icons/bi";

export interface Navbar {
    variant?:"row" | "column";
}

export const Navbar:React.FC<Navbar> = ({variant = "column"}) => {
    const [isMenuOpened,setMenuOpened] = useState<boolean>(false);
    const location = useLocation();
    const [isOpened,setOpened] = useState<boolean|"loaded">("loaded");

    const isActive = (path:string):string =>{
        return location.pathname === path?"navbar__item active":"navbar__item";
    }
    return <> 
    <SearchModal isOpened={isOpened} setOpened={setOpened}/>
    <nav className={`navbar ${variant === "row"?"row":""}`}>
    <section className="search" onClick={()=>setOpened(true)}>
        <span className="search__wrapper">
            <BiSearchAlt2/>
        </span>
        <div className="search__result"></div>
    </section>
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
    </>
}