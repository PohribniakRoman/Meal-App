import { Link, useParams } from "react-router-dom"
import { useMeal } from "../services/hooks/useMeal";
import React, { useEffect, useState,useRef } from "react";
import { Loader } from "../components/loaders/Loader";
import { CartItem } from "../services/reducers/cartReducer";
import { Typography } from "@mui/material";
import { useUnsplash } from "../services/hooks/useUnsplash";
import { Ingredient } from "../components/Dish/Ingredient";
import { Navbar } from "../components/Navbar";


export interface DishIngredients {
    ingredient:string,
    measure:string,
}

export const DishPage:React.FC = () => {
    const params = useParams();
    const meal = useMeal();
    const unsplash = useUnsplash();
    const [dish,loadDish] = useState<CartItem|null>(null)
    const [secondaryImages,loadSecondaryImages] = useState<null|string[]|"error">(null);
    const [dishIngredients,updateIngridients] = useState<DishIngredients[]|[]>([]);

    
    useEffect(()=>{
        (async ()=>{
            const result = await meal.getMealById(params);
            if(result.strMeal){
                const newState = (await unsplash.generatePhoto(result.strMeal,8)).map((element:any) => element.urls.small);
                const ingredientCollector = [] as DishIngredients[];
                for(const key in result){
                    if(key.startsWith("strIngredient") && result[key]?.trim()){
                        if(!ingredientCollector.filter(ing=>ing.ingredient === result[key]).length){
                            const currentIndex = parseInt(key.split("strIngredient")[1]);
                            ingredientCollector.push({ingredient:result[key],measure:result["strMeasure"+currentIndex]})
                        }
                    }
                }
                updateIngridients(ingredientCollector);
                loadDish(result);
                if(!newState.length){
                    loadSecondaryImages("error");
                }else{
                    loadSecondaryImages(newState);
                }
            }
        })();
    },[params.id])
    
    const imageLoading = (event:React.SyntheticEvent<HTMLImageElement, Event>) =>{
        const element = event.target as HTMLImageElement;
        element.classList.remove("preloader");
    }

        
    return <>
        <Navbar variant="row"/>
        <section className="dish">
                {!dish || !secondaryImages?<Loader fullsize={true}/>:<>
                <Typography variant="h3" className="dish--title">{dish.strMeal}</Typography>
                <Link target="_blank" className="dish--link" to="https://www.bbcgoodfood.com/recipes/3028701/threecheese-souffls">link to source</Link>
                <Typography className="dish__globals">
                    <i>{dish.strArea}</i>
                    <b>/</b>
                    <i>{dish.strCategory}</i>
                </Typography>
                <div className="dish__cover" >
                    {secondaryImages === "error"?
                        <div key={dish.strMealThumb} className="dish__cover--item main">
                            <img loading="lazy" src={dish.strMealThumb} className="dish__cover--secondary preloader" onLoad={imageLoading}/>
                        </div>
                    :(secondaryImages.map((url,index)=>{
                        if(secondaryImages.length < 8){
                            return index === secondaryImages.length-1 && 
                            <React.Fragment key={index}>
                            <div key={dish.strMealThumb} className={`dish__cover--item ${secondaryImages.length === 1?"main-right":"main"}`}>
                                <img loading="lazy" src={dish.strMealThumb} className="dish__cover--secondary preloader" onLoad={imageLoading}/>
                            </div>
                            <div key={url} className={`dish__cover--item ${secondaryImages.length === 1?"main-left":""}`}>
                                <img loading="lazy" src={url} className="dish__cover--secondary preloader" onLoad={imageLoading}/>
                            </div>
                            </React.Fragment>;
                        }
                        return index === 0?
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
                        </div>}))}
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
        </>
}