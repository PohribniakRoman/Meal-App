import { Typography } from "@mui/material"
import { Variant } from "@mui/material/styles/createTypography";
import React from "react";

export type CartPlaceholder = {variant:Variant}; 

export const CartPlaceholder:React.FC<CartPlaceholder> = ({variant}) =>{
    return <Typography variant={variant} className="cart__placeholder">There is nothing <br/> in your cart:(</Typography>
} 