import { Chip, Typography } from "@mui/material";
import { DishIngredients } from "../../pages/DishPage";
import { useState,useEffect,useRef } from "react";
import { useUnsplash } from "../../services/hooks/useUnsplash";

export interface Ingredient {
    data:DishIngredients
}

interface HelperLocation {
    isVisivle:boolean,
    x:number,
    y:number,
}

export const Ingredient:React.FC<Ingredient> = ({data}) =>{
    const [ingredientImg,loadIngredientImage] = useState<null|URL>(null)
    const [helperState,setHelperState] = useState<HelperLocation>({isVisivle:false,x:0,y:0})
    const unsplash = useUnsplash();
    const once = useRef<boolean>(true);

    const mouseMoveHandler = (event:MouseEvent) =>{
        setHelperState({isVisivle:true,x:event.x+20,y:event.y})
    }

    useEffect(()=>{
        if(once.current){
        once.current= false;
            (async()=>{
                loadIngredientImage((await unsplash.generatePhoto(data.ingredient,1))[0].urls.small);
            })()
        }
    },[]);
    
    return <>
        <div className="dish__ingredients--item" onMouseOver={(event)=>{
            const element = event.target as HTMLDivElement;
            element.addEventListener("mousemove",mouseMoveHandler);
        }}
        onMouseOut={(event)=>{
            const element = event.target as HTMLDivElement;
            element.removeEventListener("mousemove",mouseMoveHandler);
            setHelperState({isVisivle:false,x:0,y:0})
        }}
        >
            <Chip label={data.ingredient}/>
        </div>
        <div className="dish__ingredients--helper" style={{marginTop:helperState.y+"px",marginLeft:helperState.x+"px",display:`${helperState.isVisivle?"block":"none"}`}}>
            <Typography className="dish__ingredients--helper-measure">{data.measure}</Typography>
            <div className="dish__ingredients--helper-cover" style={{backgroundImage:`url(${ingredientImg})`}}></div>
        </div>
    </>
}