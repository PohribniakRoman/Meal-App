import { Button, Typography } from "@mui/material";
import { Navbar } from "../components/Navbar"
import { Dish } from "../components/Dish/Dish"
import { useDispatch, useSelector } from "react-redux";
import { State } from "../services/reducers/combinedReducer";
import { BiDollar } from "react-icons/bi";
import { Counter } from "../components/Counter";
import { CartPlaceholder } from "../components/CartPlaceholder";


export const Cart:React.FC = () =>{
    const cart = useSelector((state:State)=>state.cart)
    const dispatch = useDispatch();

    return <section className="page">
        <Navbar/>
        <div className="page__container fullsize">
        <Typography className="page__title">Cart </Typography>
            <div className="side-cart__container">
                {!cart.products.length ?<CartPlaceholder variant="h2"/>:cart.products.map((product)=>{
                    return <Dish key={product.idMeal} product={product}/>
                })}
            </div>
            <div className="side-cart__controls">
                <Typography className="side-cart__price"><Counter value={cart.price}/><BiDollar/></Typography>
                <Button variant="contained" onClick={()=>{dispatch({type:"SELL_ITEMS"})}} className="side-cart__buy">Buy</Button>
            </div>
        </div>
    </section>
}