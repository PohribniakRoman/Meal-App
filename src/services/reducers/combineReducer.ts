import { combineReducers } from "@reduxjs/toolkit";
import { cartReducer } from "./cartReducer";

export const combinedReducer = combineReducers({
    cart:cartReducer,
})