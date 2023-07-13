import { Typography } from "@mui/material";
import { Navbar } from "../components/Navbar"
import { Dish } from "../components/Dish/Dish"
import { useSelector } from "react-redux";
import { State } from "../services/reducers/combinedReducer";
import { BiDollar } from "react-icons/bi";
import { Counter } from "../components/Counter";
import { CartPlaceholder } from "../components/CartPlaceholder";


export const Cart:React.FC = () =>{
    const cart = useSelector((state:State)=>state.cart)

    return <section className="page">
        <Navbar/>
        <div className="page__container fullsize">
        <Typography className="page__title">Cart </Typography>
            <div className="side-cart__container">
                {!cart.products.length ?<CartPlaceholder variant="h2"/>:cart.products.map((product)=>{
                    return <Dish key={product.idMeal} product={product}/>
                })}
            </div>
            <Typography className="side-cart__price" sx={{textAlign:"center"}}> <Counter value={cart.price}/><BiDollar/></Typography>
        </div>
    </section>
}