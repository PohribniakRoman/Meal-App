import {  Typography } from "@mui/material";
import { Navbar } from "../components/Navbar";
import { Search } from "../components/Search/Search";
import { Dish } from "../components/Dish/Dish";
import { SideCart } from "../components/SideCart";
import { useMeal } from "../services/hooks/useMeal";
import {useState,useEffect} from "react";
import { Loader } from "../components/loaders/Loader";

const getDish = (size:number,dishList:any[],loadDish:Function) => {
    const meal = useMeal();
    const mealState = [...dishList];
    (async ()=>{
        while (mealState.length < (dishList.length + size)) {
            const newMeal = await meal.generateMeal();
            if(!mealState.filter(e=>e.idMeal === newMeal.idMeal).length){
                mealState.push(newMeal);
            }
        }
        loadDish([...mealState])
    })()
}

export const Shop:React.FC = () => {
    const [dishList,loadDish] = useState<any[]>([]);
    
    
    useEffect(()=>{
        getDish(16,dishList,loadDish);
    },[])
    
    return <section className="page">
        <Navbar/>
        <div className="page__container">   
            <Search/>
            <div className="page__label">
            <div className="pushable" onClick={()=>{getDish(10,dishList,loadDish);}}><Typography className="front"> Load Products </Typography></div>
            <Typography className="page__title">Shop</Typography>
            </div> 
            {!dishList.length?<Loader/>:
            <div className="product__wrapper" id="page-container">
                {dishList.map(dish=>{
                    return <Dish key={dish.idMeal} product={dish}/>
                })}
            </div>}
        </div>
        <SideCart/>
    </section>
}