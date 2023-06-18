import { Typography } from "@mui/material";
import { CartItem } from "../services/reducers/cartReducer";
import {AiFillStar, AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import {BiDollar} from "react-icons/bi";
import {useEffect, useState} from "react";
import { useSelector,useDispatch } from "react-redux";
import { State } from "../services/reducers/combinedReducer";
import { useUnsplash } from "../services/hooks/useUnsplash";
import { ProductLoader } from "./loaders/ProductLoader";


export const Product:React.FC<Record<string,CartItem | any>> = ({product}:Record<string,CartItem | any>) => {
    const dispatch = useDispatch()
    const cartProducts = useSelector((state:State)=>state.cart.products)
    
    const checkCart = ():boolean => cartProducts.filter(e=>e.id === product.id).length > 0
    
    const [isInCart,setInCart] = useState<boolean>(checkCart());
    const photo = useUnsplash(product.label);

    useEffect(()=>{
        setInCart(checkCart())
    },[cartProducts])

    const addToCart = (product:CartItem)=>{
        dispatch({type:"ADD_ITEM",payload:{price:product.price,product}});
    }

    const removeFromCart = (product:CartItem)=>{
        dispatch({type:"REMOVE_ITEM",payload:{price:product.price,product}});
    }


    return <section className="product">
        {photo === null?<ProductLoader/>:<>
        <div className="product__cover" style={{backgroundImage:`url(${photo})`}} data-away={product.away} data-time={product.awayTime}>
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
        </div></>}
    </section>
}