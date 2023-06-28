import { Typography } from "@mui/material";
import { Navbar } from "../components/Navbar";
import { Search } from "../components/Search";
import { Product } from "../components/Product";
import { SideCart } from "../components/SideCart";
import { useMeal } from "../services/hooks/useMeal";
import { PageLoader } from "../components/loaders/PageLoader";
import {useEffect,useState} from "react";

export const Shop:React.FC = () => {
    const meal = useMeal();
    const [dishList,loadDish] = useState<any[]>([]);

    useEffect(()=>{
        (async ()=>{
            const newMeal = await meal.generateMeal();
            loadDish(prev=>[...prev,newMeal])
            console.log(dishList);
        })()
    },[])

    console.log(dishList);

    if(!dishList.length){
        return <PageLoader/>
    }
    
    return <section className="page">
        <Navbar/>
        <div className="page__container">   
            <Search/>
            <Typography className="page__title">Shop</Typography>
            <div className="product__wrapper">
                {dishList.map(dish=>{
                    return <Product key={dish.idMeal} product={dish}/>
                })}
            </div>
        </div>
        <SideCart/>
    </section>
}