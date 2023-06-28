import { Typography } from "@mui/material";
import { Navbar } from "../components/Navbar"
import { Product } from "../components/Product"


export const Cart:React.FC = () =>{
    return <section className="page">
        <Navbar/>
        <div className="page__container">
        <Typography className="page__title">Cart</Typography>
            <div className="product__wrapper">
            </div>
        </div>
    </section>
}