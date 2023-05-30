(()=>{
    if(!localStorage.getItem("cart")){
      localStorage.setItem("cart",JSON.stringify([]))
    }
  })()


export type CartItem = {
    label:string,
    price:number,
    discount:boolean|number,
    store:string,
    img:string,
    view:number,
    rating:number,
    id:string | number,
};

export type Action = {
    type:string,
    payload:any,
}

const updateStorage = (state:CartItem[]) => {
    localStorage.setItem("cart",JSON.stringify(state));
    return(state);
}

const cart = localStorage.getItem("cart");
let defaultState:CartItem[] = [];
if(cart !== null){
    defaultState = JSON.parse(cart);
} 

export const cartReducer = (state = defaultState,action:Action) => {
    switch (action.type) {
        case "ADD_ITEM":
            return updateStorage([...state,action.payload])
        case "REMOVE_ITEM":
            return updateStorage([...state,action.payload])  
    }
}