import { combineReducers } from "@reduxjs/toolkit";
import { Cart, cartReducer } from "./cartReducer";

export type State = {
    cart:Cart
}

export const combinedReducer = combineReducers({
    cart:cartReducer,
})