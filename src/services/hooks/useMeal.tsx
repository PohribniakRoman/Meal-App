export const useMeal = () => {
    const generateMeal = async () => { 
            const meal = await (await (fetch(`https://www.themealdb.com/api/json/v1/1/random.php`))).json()
            return meal.meals[0]
    }
    return {generateMeal};
}