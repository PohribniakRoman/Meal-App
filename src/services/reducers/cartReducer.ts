(() => {
    if (!localStorage.getItem("cart")) {
        localStorage.setItem("cart", JSON.stringify({price: 0, products: []}))
    }
    if(!localStorage.getItem("history")){
        localStorage.setItem("history",JSON.stringify([]))
    }
})()

export type Cart = {
    price: number;
    products: CartItem[],
    date?:Date,
}

export type CartItem = {
    strMeal: string,
    price: number,
    strArea: string,
    strYoutube:string,
    strMealThumb: string,
    strCategory: string,
    strInstructions: string,
    idMeal: number,
    amount:number,
};

export type CartAction = {
    type: "ADD_ITEM" | "REMOVE_ITEM" | "SELL_ITEMS",
    payload: any,
}

const updateStorage = (state: Cart) => {
    localStorage.setItem("cart", JSON.stringify(state));
    return (state);
}

const loadToHistory = (state:Cart) => {
    const history = localStorage.getItem("history");
    if(history){
        const lastHistory = JSON.parse(history);
        localStorage.setItem("history",JSON.stringify([...lastHistory,state]));
    }
}

const cart = localStorage.getItem("cart");
let defaultState: Cart = { price: 0, products: [] };
if (cart) {
    defaultState = JSON.parse(cart);
}

export const cartReducer = (state = defaultState, action: CartAction) => {
    switch (action.type) {
        case "ADD_ITEM":{
            action.payload.product.price = action.payload.price;
            return updateStorage({ price: state.price + action.payload.price, products: [...state.products, action.payload.product] })
        }
        case "REMOVE_ITEM":{
            const newState: Cart = { price: state.price - action.payload.price, products: state.products.filter((product: CartItem) => product.idMeal !== action.payload.product.idMeal) }
            return updateStorage(newState)
        }
        case "SELL_ITEMS":{
            if(state.price){
                const localState = {...state};
                localState.date = new Date();
                loadToHistory(localState);
            }
            return updateStorage({ price: 0, products: [] });
        }
        default:{
            return defaultState;
        }
    }
}