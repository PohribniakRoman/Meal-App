import { Button,Typography } from "@mui/material";
import { CartItem } from "../services/reducers/cartReducer";
import {HiOutlinePlusSm} from "react-icons/hi";
import {IoMdRemove} from "react-icons/io";
import {useState} from "react";

export const Product:React.FC<Record<string,CartItem | any>> = ({product}:Record<string,CartItem | any>) => {
    const [isInCart,setInCart] = useState(false)
    
    return <section className="product">
        <Typography className="product__store">{product.store}</Typography>
        <div className="product__cover"></div>
        <div className="product__container">
        <Typography variant="h4" className="product__label">{product.label}</Typography>
        <Typography variant="h5" className="product__price">{product.price}</Typography>
        </div>
        <Typography className="product__description">{product.description}</Typography>
        <div className="product__buttons">
            {!isInCart?
            <Button variant="contained" className="product__add" onClick={()=>{
                setInCart(true);
            }}><HiOutlinePlusSm/></Button>:
            <Button variant="contained" className="product__remove" onClick={()=>{
                setInCart(false);
            }}><IoMdRemove/></Button>}
        </div>

    </section>
}