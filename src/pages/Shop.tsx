import {  Typography } from "@mui/material";
import { Navbar } from "../components/Navbar";
import {RiRefreshLine} from "react-icons/ri";
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
            if(newMeal === "error"){
                break;
            }else{
                if(!mealState.filter(e=>e.idMeal === newMeal.idMeal).length){
                    mealState.push(newMeal);
                }
            }
        }
        loadDish(mealState.reverse())
    })()
}

export const Shop:React.FC = () => {
    const [dishList,loadDish] = useState<any[]>([]);
    const [mealListSize,setMealListSize] = useState<number>(0)
    
    
    useEffect(()=>{
        getDish(16,dishList,loadDish);
        setMealListSize(mealListSize+16);
    },[])
    
    return <section className="page">
        <Navbar/>
        <div className="page__container shop" id="page-container" style={{width:"50vw"}}>   
            <div className="page__label">
                <Typography className="page__title">Shop</Typography>
            </div> 
            <div className="product__wrapper">
            {!dishList.length?<Loader/>:
                (dishList.map(dish=>{
                    return <Dish key={dish.idMeal} product={dish}/>
                }))}
            </div>
            <div className="pushable" onClick={()=>{
                getDish(10,dishList,loadDish);
                setMealListSize(mealListSize+10);
                }}><Typography className={`front ${mealListSize ===  dishList.length?"":"rotate"}`}> <RiRefreshLine/></Typography></div>
        </div>
        <SideCart/>
    </section>
}