export interface MealByLetter {
    letter:string
}
export interface MealById {
    id?:number
}

export const useMeal = () => {
    const generateMeal = async () => { 
            const meal = await (await (fetch(`https://www.themealdb.com/api/json/v1/1/random.php`))).json()
            return meal.meals[0]
    }

    const getMealByLetter = async ({letter}:MealByLetter) => {
        try{
            const result = await (await (fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`))).json()
            return result.meals;
        }catch{}
    }
    const getMealById = async ({id=0}:MealById)=>{
        try{
            const result = await (await (fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`))).json()
            return result.meals[0];
        }catch{}
    }
    return {generateMeal,getMealByLetter,getMealById};
}