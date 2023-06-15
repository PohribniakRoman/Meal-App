import { Typography } from "@mui/material";
import { CartAction, CartItem } from "../services/reducers/cartReducer";
import {AiFillStar, AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import {BiDollar} from "react-icons/bi";
import {useEffect, useState} from "react";
import { useSelector,useDispatch } from "react-redux";
import { State } from "../services/reducers/combinedReducer";

export const Product:React.FC<Record<string,CartItem | any>> = ({product}:Record<string,CartItem | any>) => {
    const cartProducts = useSelector((state:State)=>state.cart.products)
    const dispatch = useDispatch()
    const checkCart = ():boolean => cartProducts.filter(e=>e.id === product.id).length > 0
    const [isInCart,setInCart] = useState<boolean>(checkCart());

    useEffect(()=>{
        setInCart(checkCart())
    },[cartProducts])

    const addToCart = (product:CartItem)=>{
        const body:CartAction = {type:"ADD_ITEM",payload:{price:product.price,product}}
        dispatch(body);
    }

    const removeFromCart = (product:CartItem)=>{
        const body:CartAction = {type:"REMOVE_ITEM",payload:{price:product.price,product}}
        dispatch(body);
    }

    return <section className="product">
        <div className="product__cover" data-away={product.away} data-time={product.awayTime}>
            {isInCart?
            <div className="product__cover--button remove" onClick={()=>removeFromCart(product)}>
               <Typography className="product__cover--button-icon"><AiOutlineMinus/></Typography>
            </div>:
            <div className="product__cover--button add" onClick={()=>addToCart(product)}>
                <Typography className="product__cover--button-icon"><AiOutlinePlus/></Typography>
            </div>}
        </div>
        <div className="product__container">
        <Typography className="product__label">{product.label}</Typography>
        <Typography className="product__price"><BiDollar/>{product.price}</Typography>
        </div>

        <div className="product__container">
            <Typography className="product__store">{product.store}</Typography>
            <div className="product__rating">
                <Typography className="product__view">({product.view} reviews)</Typography>
                <Typography>
                {product.rating}
                <AiFillStar/>
                </Typography>
            </div>
        </div>
    
    </section>
}