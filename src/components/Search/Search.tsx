import {BiSearchAlt2} from "react-icons/bi";
import { SearchModel } from "./SearchModel";
import {useState} from "react";

export const Search:React.FC = () => {
    const [isOpened,setOpened] = useState<boolean|"loaded">("loaded");
    return <>
    <SearchModel isOpened={isOpened} setOpened={setOpened}/>
    <section className="search" onClick={()=>setOpened(true)}>
        <span className="search__wrapper">
            <input value="" type="text" className="search__field" placeholder="Search"/>
            <BiSearchAlt2/>
        </span>
        <div className="search__result"></div>
    </section>
    </>
    }