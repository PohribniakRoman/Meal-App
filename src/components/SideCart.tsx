import { useSelector } from "react-redux"
import { State } from "../services/reducers/combinedReducer"
import { Typography } from "@mui/material"
import { BiDollar } from "react-icons/bi"
import { Product } from "./Product"

export const SideCart:React.FC = () =>{
    const cart = useSelector((state:State)=>state.cart)

    return <section className="side-cart">
        <Typography className="page__title">Cart / {cart.price}<BiDollar/></Typography>
        {cart.products.map((product)=>{
            return <Product key={product.id} product={product}/>
        })}
    </section>
} 