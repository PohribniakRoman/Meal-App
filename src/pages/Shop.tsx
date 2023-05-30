import { Typography } from "@mui/material"
import { Navbar } from "../components/Navbar"
import { Search } from "../components/Search"

export const Shop:React.FC = () => {
    return <section className="page">
        <Navbar/>
        <div className="page__container">   
            <Search/>

            <Typography className="page__title">Shop</Typography>
        </div>
    </section>
}