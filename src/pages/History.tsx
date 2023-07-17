import { Typography } from "@mui/material"
import {Navbar} from "../components/Navbar"
import { BiDollar } from "react-icons/bi"
import { BillMeal } from "../components/Bill/BillMeal"
import { useRef } from "react"
import { Cart } from "../services/reducers/cartReducer"
import { Error404 } from "./Error404"

export const History:React.FC = () => {
    const rawHistory = localStorage.getItem("history");
    const history = useRef<null|Cart[]>(null)
    if(rawHistory){
        history.current = JSON.parse(rawHistory);
    }
    if(!history.current){
        return <Error404/>
    }
    return <section className="page">
        <Navbar/>
        <div className="page__container fullsize flex">   
            <Typography className="page__title">Purchase History</Typography>
            <div className="purchase">
                    {history.current.map((bill:Cart,index)=>{
                        return <div className="purchase--item" key={index}>
                                <Typography className="purchase--index">Bill {index+1}</Typography>
                                <div className="purchase--dishes">
                                    <Typography  className="purchase--dishes-title">Dishes <span>{bill.date?new Date(bill.date).toLocaleDateString():new Date().toLocaleDateString()}</span></Typography>
                                    {bill.products.map(meal=>{
                                        return <BillMeal key={meal.idMeal} meal={meal} />
                                    })}
                                </div>
                                <Typography className="purchase--total"><BiDollar/>{bill.price}.00</Typography>
                        </div>
                    })} 
            </div>
        </div>
    </section>
}