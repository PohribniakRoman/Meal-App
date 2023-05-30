import {BiSearchAlt2} from "react-icons/bi";

export const Search:React.FC = () => {
    return <section className="search">
        <span className="search__wrapper">
            <input type="text" className="search__field" placeholder="Search"/>
            <BiSearchAlt2/>
        </span>
        <div className="search__result"></div>
    </section>}