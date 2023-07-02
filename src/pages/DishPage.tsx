import { Link, useParams } from "react-router-dom"
import { useMeal } from "../services/hooks/useMeal";
import React, { useEffect, useState,useRef } from "react";
import { Loader } from "../components/loaders/Loader";
import { CartItem } from "../services/reducers/cartReducer";
import { Typography } from "@mui/material";
import { useUnsplash } from "../services/hooks/useUnsplash";
import { Ingredient } from "../components/Dish/Ingredient";


export interface DishIngredients {
    ingredient:string,
    measure:string,
}

export const DishPage:React.FC = () => {
    const params = useParams();
    const meal = useMeal();
    const unsplash = useUnsplash();
    const once = useRef<boolean>(true);
    const [dish,loadDish] = useState<CartItem|null>(null)
    const [secondaryImages,loadSecondaryImages] = useState<null|string[]>(null);
    const [dishIngredients,updateIngridients] = useState<DishIngredients[]|[]>([]);

    
    useEffect(()=>{
        if(once.current){
            once.current = false; 
            (async ()=>{
                const result = await meal.getMealById(params);
                if(result.strMeal){
                    loadSecondaryImages((await unsplash.generatePhoto(result.strMeal,8)).map((element:any) => element.urls.small))
                    const ingredientCollector = [] as DishIngredients[];
                    for(const key in result){
                        if(key.startsWith("strIngredient") && result[key]){
                            ingredientCollector.push({ingredient:result[key],measure:""})
                        }
                        if(key.startsWith("strMeasure") && result[key]){
                            ingredientCollector[parseInt(key.split("strMeasure")[1])-1].measure = result[key];
                        }
                    }
                    updateIngridients(ingredientCollector);
                    loadDish(result);
                }
            })();
        }
    },[])
    
    const imageLoading = (event:React.SyntheticEvent<HTMLImageElement, Event>) =>{
        const element = event.target as HTMLImageElement;
        element.classList.remove("preloader");
    }

        console.log(dish);
        
    return <section className="dish">
            {!dish || !secondaryImages?<Loader fullsize={true}/>:<>
            <Link target="_blank" to="https://www.bbcgoodfood.com/recipes/3028701/threecheese-souffls"><Typography variant="h3" className="dish--title">{dish.strMeal}</Typography></Link>
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
                        <img loading="lazy" src={dish.strMealThumb} className="dish__cover--secondary preloader" onLoad={imageLoading}/>
                    </div>
                    <div key={url} className="dish__cover--item">
                        <img loading="lazy" src={url} className="dish__cover--secondary preloader" onLoad={imageLoading}/>
                    </div>
                    </React.Fragment>:
                    <div key={url} className="dish__cover--item">
                        <img loading="lazy" src={url} className="dish__cover--secondary preloader" onLoad={imageLoading}/>
                    </div>})}
            </div>
            <Typography className="dish--title" variant="h4">Ingredients</Typography>
            <div className="dish__ingredients">{dishIngredients.map(ingredient=>{
                return <Ingredient key={ingredient.ingredient} data={ingredient}/>
            })}</div>
            <Typography className="dish--title" variant="h4">Recipe</Typography>
            <Typography className="dish__instruction">{dish.strInstructions}</Typography>
            <Typography className="dish--title" variant="h4">Video guide</Typography>
            <div className="dish__video">
            <iframe className="dish__video--item" src={`https://www.youtube.com/embed/${dish.strYoutube.split("=").pop()}`} title={dish.strMeal} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            </div>
            </>}
        </section>
}