import {BiSearchAlt2} from "react-icons/bi";
import { SearchModel } from "./SearchModel";
import {useState} from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";

export const Search:React.FC = () => {
    const [isOpened,setOpened] = useState<boolean|"loaded">("loaded");
    return <>
    <SearchModel isOpened={isOpened} setOpened={setOpened}/>
    <section className="search" onClick={()=>setOpened(true)}>
        <span className="search__wrapper">
            <i>
                <BiSearchAlt2/>
            </i>
            <b>
                <AiOutlineShoppingCart/>
            </b>
        </span>
        <div className="search__result"></div>
    </section>
    </>
    }