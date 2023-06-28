import { useSelector } from "react-redux"
import { State } from "../services/reducers/combinedReducer"
import { Typography } from "@mui/material"
import { BiDollar } from "react-icons/bi"
import { Product } from "./Product"
import { useRef } from "react"

export const SideCart:React.FC = () =>{
    const cart = useSelector((state:State)=>state.cart)
    const container = useRef<null|HTMLDivElement>(null);
    const resize = (event:MouseEvent) =>{
        if(container.current){
            const size = window.innerWidth-event.x; 
            if(size > 350 && size < window.innerWidth*0.60){
                container.current.style.width= size+"px";
                const dishContainer:HTMLDivElement|null = document.querySelector("#page-container");
                if(dishContainer){
                    dishContainer.style.width = window.innerWidth-size-125+"px";
                }
            }else{
                document.addEventListener("mouseup",()=>{document.removeEventListener("mousemove",resize)});
            }
        }
    }
    document.addEventListener("mouseup",()=>{document.removeEventListener("mousemove",resize)});
    return <section className="side-cart" ref={container}>
        <div className="side-cart__border"
        onMouseDown={()=>{document.addEventListener("mousemove",resize)}}></div>
        <div className="side-cart__wrapper">
            <Typography className="page__title">Cart / {cart.price}<BiDollar/></Typography>
            <div className="side-cart__container">
            {!cart.products.length ?<Typography variant="h5" className="cart__placeholder">There is nothing in your cart:(</Typography> :cart.products.map((product)=>{
                    return <Product key={product.idMeal} product={product}/>
                })}
            </div>
        </div>
    </section>
} 