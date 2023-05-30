import { Typography } from "@mui/material"
import {Navbar} from "../components/Navbar"

export const Saved:React.FC = () => {
    return <section className="page">
        <Navbar/>
        <div className="page__container">   
            <Typography className="page__title">Saved Products</Typography>
        </div>
    </section>
}