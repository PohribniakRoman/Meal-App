import { useParams } from "react-router-dom"
import { Navbar } from "../components/Navbar"
import { useMeal } from "../services/hooks/useMeal";
import { useEffect, useState } from "react";
import { Loader } from "../components/loaders/Loader";
import { CartItem } from "../services/reducers/cartReducer";
import { Typography } from "@mui/material";

export const DishPage:React.FC = () => {
    const params = useParams();
    const meal = useMeal();
    const [dish,loadDish] = useState<CartItem|null>(null)
    useEffect(()=>{
        (async ()=>{
            loadDish(await meal.getMealById(params));
        })();
    },[])
    console.log(dish);
    
    return <section className="page">
        <Navbar/>
        {!dish?<Loader/>:<section className="page__container fullsize dish">
            <Typography variant="h3">{dish.strMeal}</Typography>
            <div className="dish__cover" style={{backgroundImage:`url(${dish.strMealThumb})`}}></div>
            <Typography className="dish__instruction">{dish.strInstructions}</Typography>
        </section>}
    </section>
}