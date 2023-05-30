import { Button,Typography } from "@mui/material";
import { CartItem } from "../services/reducers/cartReducer";
import {AiFillStar} from "react-icons/ai";
import {BiDollar} from "react-icons/bi";
import {useState} from "react";

export const Product:React.FC<Record<string,CartItem | any>> = ({product}:Record<string,CartItem | any>) => {
    const [isInCart,setInCart] = useState(false)
    
    return <section className="product">
        <div className="product__cover" data-away={product.away} data-awayTime={product.awayTime}></div>
        <div className="product__container">
        <Typography className="product__label">{product.label}</Typography>
        <Typography className="product__price"><BiDollar/>{product.price}</Typography>
        </div>

        <div className="product__container">
            <Typography className="product__store">{product.store}</Typography>
            <Typography className="product__rating">
                <Typography className="product__view">({product.view} reviews)</Typography>
                {product.rating}
                <AiFillStar/>
            </Typography>
        </div>
    
    </section>
}