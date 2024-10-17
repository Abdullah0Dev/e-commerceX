import { configureStore } from "@reduxjs/toolkit";
import cartReducers from "./reducers/cartReducers";
const store = configureStore({
    reducer: {
        cart: cartReducers,
    }
})
export default store;