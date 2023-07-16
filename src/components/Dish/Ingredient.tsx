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
    const helper = useRef<null | HTMLDivElement>(null);

    const mouseMoveHandler = (event:MouseEvent) =>{
        if(helper.current){
            setHelperState({isVisivle:true,x:-1000,y:-1000})
            const equalizer = (event.x + helper.current.offsetWidth) > window.innerWidth?-(helper.current.offsetWidth+20):10;
            if(helper.current.offsetWidth > 0){
                setHelperState({isVisivle:true,x:event.x+equalizer,y:event.y})
            }
        }
    }
    
    useEffect(()=>{
        if(once.current){
        once.current= false;
            (async()=>{
                const result = await unsplash.generatePhoto(data.ingredient,1);
                if(result[0]){
                    loadIngredientImage(result[0].urls.small);
                }
            })()
        }
    },[]);
    
    return <>
        <div className="dish__ingredients--item" onMouseOver={(event)=>{
            const element = event.target as HTMLDivElement;
            element.addEventListener("mousemove",mouseMoveHandler);
        }}
        onTouchStart={(e)=>{
            if(helper.current){
                setHelperState({isVisivle:true,x:-1000,y:-1000})
                const equalizer = (e.changedTouches[0].clientX + helper.current.offsetWidth) > window.innerWidth?-(helper.current.offsetWidth+20):10;
                if(helper.current.offsetWidth > 0){
                    setHelperState({isVisivle:true,x:e.changedTouches[0].clientX+equalizer,y:e.changedTouches[0].clientY})
                }
            }
        }}

        onTouchEnd={()=>{setHelperState({isVisivle:false,x:0,y:0})}}
        onMouseOut={(event)=>{
            const element = event.target as HTMLDivElement;
            element.removeEventListener("mousemove",mouseMoveHandler);
            setHelperState({isVisivle:false,x:0,y:0})
        }}
        >
            <Chip label={data.ingredient}/>
        </div>
        <div ref={helper} className="dish__ingredients--helper" style={{marginTop:helperState.y+"px",marginLeft:helperState.x+"px",display:`${helperState.isVisivle?"block":"none"}`}}>
            <Typography className="dish__ingredients--helper-measure">{data.measure}</Typography>
            <div className="dish__ingredients--helper-cover" style={{backgroundImage:`url(${ingredientImg})`}}></div>
        </div>
    </>
}