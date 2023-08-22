import { Typography } from "@mui/material";
import { CartItem } from "../../services/reducers/cartReducer";
import { AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import {BiDollar} from "react-icons/bi";
import {useEffect, useState} from "react";
import { useSelector,useDispatch } from "react-redux";
import { State } from "../../services/reducers/combinedReducer";
import { Link } from "react-router-dom";
import { DishCounter } from "./DishCounter";


export interface Dish{
    product:CartItem
}

export const Dish:React.FC<Dish> = ({product}) => {
    const dispatch = useDispatch()
    const [currentAmount, setCurrentAmount] = useState<number>(product.amount?product.amount : 0);
    const cartProducts = useSelector((state:State)=>state.cart.products)
    
    const checkCart = ():boolean => cartProducts.filter(e=>e.idMeal === product.idMeal).length > 0
    
    const [isInCart,setInCart] = useState<boolean>(checkCart());

    useEffect(()=>{
        setInCart(checkCart())
    },[cartProducts])

    const addToCart = (product:CartItem)=>{
        if(product.amount){
            dispatch({type:"ADD_ITEM",payload:{price:Math.floor(product.idMeal/1000)*product.amount,product}});
        }else{
            alert("You can't buy 0 items(")
        }
    }

    const removeFromCart = (product:CartItem)=>{
        dispatch({type:"REMOVE_ITEM",payload:{price:Math.floor(product.idMeal/1000)*product.amount,product}});
    }


    return <section className="product">
        <div className="product__cover" style={{backgroundImage:`url(${product.strMealThumb})`}} data-category={product.strCategory}>
            {isInCart?
            <div className="product__cover--button remove" onClick={()=>removeFromCart({...product,amount:currentAmount})}>
               <Typography className="product__cover--button-icon"><AiOutlineMinus/></Typography>
            </div>:
            <div className="product__cover--button add" onClick={()=>addToCart({...product,amount:currentAmount})}>
                <Typography className="product__cover--button-icon"><AiOutlinePlus/></Typography>
            </div>}
        </div>
        <Link  to={`/dish/${product.idMeal}`} className="product__container">
            <Typography className="product__label">{product.strMeal}</Typography>
            <Typography className="product__price"><BiDollar/>{Math.floor(product.idMeal/1000)*(currentAmount?currentAmount:1)}</Typography>
        </Link>

        <div className="product__container">
            <Typography className="product__store">{product.strArea}</Typography>
            <DishCounter amount={currentAmount} setAmount={setCurrentAmount} isDisabled={isInCart}/>
        </div>
    </section>
}