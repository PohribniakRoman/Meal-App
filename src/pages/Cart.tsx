import { Typography } from "@mui/material";
import { Navbar } from "../components/Navbar"
import { Product } from "../components/Product"
import { useSelector } from "react-redux";
import { State } from "../services/reducers/combinedReducer";
import { BiDollar } from "react-icons/bi";
import { CartItem } from "../services/reducers/cartReducer";


export const Cart:React.FC = () =>{
    const cart = useSelector((state:State)=>state.cart)

    return <section className="page">
        <Navbar/>
        <div className="page__container fullsize">
        <Typography className="page__title">Cart / {cart.price}<BiDollar/></Typography>
        <div className="side-cart__container">
                {!cart.products.length ?<Typography variant="h2" className="cart__placeholder">There is nothing in your cart:(</Typography> :cart.products.map((product)=>{
                    return <Product key={product.idMeal} product={product}/>
                })}
            </div>
        </div>
    </section>
}