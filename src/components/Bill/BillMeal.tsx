import { Typography } from "@mui/material"
import { BiDollar } from "react-icons/bi"
import { CartItem } from "../../services/reducers/cartReducer"
import { Link } from "react-router-dom"

export interface BillMeal {
    meal:CartItem
}

export const BillMeal:React.FC<BillMeal> = ({meal}) =>{
    return <div className="purchase--dishes-wrapper">
        <div className="purchase--dishes-container">
            <Link  to={`/dish/${meal.idMeal}`}  className="purchase--dishes-label">
                <Typography>{meal.strMeal}</Typography>
            </Link>
            <Typography className="purchase--dishes-price">{meal.price}<BiDollar/></Typography>
        </div>
        <div className="purchase--dishes-container">
            <Typography className="purchase--dishes-origin">{meal.strArea}</Typography>
            <Typography className="purchase--dishes-calc">{meal.amount} x {meal.price/meal.amount}</Typography>
        </div>
    </div>
}