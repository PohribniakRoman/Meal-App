import { useSelector } from "react-redux"
import { State } from "../services/reducers/combinedReducer"
import { Typography } from "@mui/material"
import { BiDollar } from "react-icons/bi"
import { Dish } from "./Dish/Dish"
import React, { useRef } from "react"
import { Counter } from "./Counter"
import { CartPlaceholder } from "./CartPlaceholder"

export const SideCart:React.FC = () =>{
    const cart = useSelector((state:State)=>state.cart)
    const container = useRef<null|HTMLDivElement>(null);
    const resize = (event:MouseEvent | "resize") =>{
            const size = window.innerWidth - (event !== "resize"?event.x:0); 
            const dishContainer:HTMLDivElement|null = document.querySelector("#page-container");
            if(dishContainer && container.current){
                if(size > Math.max(370,window.innerWidth*0.15) && size < window.innerWidth*0.65){
                    container.current.style.width= Math.min((size/window.innerWidth)*100,73)+"vw";
                    dishContainer.style.width = Math.min(((window.innerWidth-size-125)/window.innerWidth)*100,73)+"vw";
                }else{
                    document.addEventListener("mouseup",()=>{document.removeEventListener("mousemove",resize)});
                }
                if(event === "resize"){
                    if(window.innerWidth*0.65+650 > window.innerWidth && container.current.clientWidth-5 < 450){
                        container.current.style.width= 450+"px";
                        dishContainer.style.width = (window.innerWidth-650)+"px";
                    }else if(window.innerHeight > (container.current.clientWidth-5 + dishContainer.clientWidth +125)*1.05){
                        container.current.style.width= "30vw";
                        dishContainer.style.width = "60vw";
                    }
                }
            }
    }

    const dragResize = (event:React.TouchEvent<HTMLDivElement>) => {
        const dishContainer:HTMLDivElement|null = document.querySelector("#page-container");
        const size = Math.min(Math.max(window.innerWidth - event.nativeEvent.targetTouches[0].clientX,0),window.innerWidth)
        if(size > Math.max(370,window.innerWidth*0.15) && size < window.innerWidth*0.65 && dishContainer && container.current){
            container.current.style.width= Math.min((size/window.innerWidth)*100,73)+"vw";
            dishContainer.style.width = Math.min(((window.innerWidth-size-125)/window.innerWidth)*100,73)+"vw";
        }
    }

    window.addEventListener("resize",()=>resize("resize"));
    window.addEventListener("mouseup",()=>{document.removeEventListener("mousemove",resize)});
    return <section className="side-cart" ref={container}>
        <div className="side-cart__border"
        onMouseDown={()=>{document.addEventListener("mousemove",resize)}} onTouchMove={dragResize}></div>
        <div className="side-cart__wrapper">
            <Typography className="page__title">Cart</Typography>
            <div className="side-cart__container">
            {!cart.products.length ?<CartPlaceholder variant="h5"/> :cart.products.map((product)=>{
                    return <Dish key={product.idMeal} product={product}/>
                })}
            </div>
            <Typography className="side-cart__price"><Counter value={cart.price}/><BiDollar/></Typography>
        </div>
    </section>
} 