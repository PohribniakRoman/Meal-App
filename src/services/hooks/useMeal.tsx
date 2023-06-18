import { useEffect, useState } from "react"

export const useMeal = () => {
    const [meal,setMeal] = useState<any[] | null>(null);
    useEffect(()=>{
        (async ()=>{
            const resp = await (await (fetch(`https://api.nal.usda.gov/fdc/v1/foods/list?api_key=${import.meta.env.VITE_MEAL_API_KEY}`))).json()
            setMeal(resp);
        })()
    },[])
    return meal;
}