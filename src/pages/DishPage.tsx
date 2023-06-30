import { useParams } from "react-router-dom"
import { useMeal } from "../services/hooks/useMeal";
import React, { useEffect, useState,useRef } from "react";
import { Loader } from "../components/loaders/Loader";
import { CartItem } from "../services/reducers/cartReducer";
import { Typography } from "@mui/material";
import { useUnsplash } from "../services/hooks/useUnsplash";

export const DishPage:React.FC = () => {
    const params = useParams();
    const meal = useMeal();
    const unsplash = useUnsplash();
    const [dish,loadDish] = useState<CartItem|null>(null)
    const [secondaryImages,loadSecondaryImages] = useState<null|string[]>(null);
    const once = useRef<boolean>(true);
    
    useEffect(()=>{
        if(once.current){
            once.current = false; 
            (async ()=>{
                const result = await meal.getMealById(params);
                if(result.strMeal){
                    loadSecondaryImages((await unsplash.generatePhoto(result.strMeal,8)).map((element:any) => element.links.download))
                    loadDish(result);
                }
            })();
        }
    },[])
    
    const imageLoading = (event:React.SyntheticEvent<HTMLImageElement, Event>) =>{
        const element = event.target as HTMLImageElement;
        element.classList.remove("preloader");
    }

    return <section className="dish">
            {!dish || !secondaryImages?<Loader fullsize={true}/>:<>
            <Typography variant="h3" className="dish--title">{dish.strMeal}</Typography>
            <Typography className="dish__globals">
                <i>{dish.strArea}</i>
                <b>/</b>
                <i>{dish.strCategory}</i>
            </Typography>
            <div className="dish__cover" >
                {secondaryImages.map((url,index)=>{
                    return index === 5?
                    <React.Fragment key={index}>
                    <div key={dish.strMealThumb} className="dish__cover--item main">
                        <img src={dish.strMealThumb} className="dish__cover--secondary preloader" onLoad={imageLoading}/>
                    </div>
                    <div key={url} className="dish__cover--item">
                        <img src={url} className="dish__cover--secondary preloader" onLoad={imageLoading}/>
                    </div>
                    </React.Fragment>:
                    <div key={url} className="dish__cover--item">
                        <img  src={url} className="dish__cover--secondary preloader" onLoad={imageLoading}/>
                    </div>})}
            </div>
            <Typography className="dish--subtitle" variant="h4">Recipe</Typography>
            <Typography className="dish__instruction">{dish.strInstructions}</Typography>
            </>}
        </section>
}