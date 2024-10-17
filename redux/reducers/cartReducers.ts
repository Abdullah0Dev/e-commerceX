import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartTypeState, Item } from "@/assets/types";

const initialState: CartTypeState = {
  itemList: [],
  favoriteList: [],
  cartItemList: [],
};

const cartReducers = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Item>) {
      const newItem = action.payload;
      const existingItem = state.itemList.find(
        (item) => item.id === newItem.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.itemList.push({ ...newItem, quantity: 1 });
      }
      AsyncStorage.setItem("cartItems", JSON.stringify(state.itemList));
    },

    removeFromCart(state, action: PayloadAction<number>) {
      const idRemoved = action.payload;
      state.itemList = state.itemList.filter((item) => item.id !== idRemoved);
      AsyncStorage.setItem("cartItems", JSON.stringify(state.itemList));
    },

    addToFavorite(state, action: PayloadAction<Item>) {
      const newFavorite = action.payload;
      if (!state.favoriteList.some((item) => item.id === newFavorite.id)) {
        state.favoriteList.unshift(newFavorite);
      }
      AsyncStorage.setItem("favoriteItems", JSON.stringify(state.favoriteList));
    },

    removeFromFavorite(state, action: PayloadAction<number>) {
      const idFav = action.payload;
      state.favoriteList = state.favoriteList.filter(
        (item) => item.id !== idFav
      );
      AsyncStorage.setItem("favoriteItems", JSON.stringify(state.favoriteList));
    },

    incrementQty(state, action: PayloadAction<number>) {
      const itemId = action.payload;
      const itemToUpdate = state.itemList.find((item) => item.id === itemId);
      if (itemToUpdate) {
        itemToUpdate.quantity += 1;
      }
      AsyncStorage.setItem("cartItems", JSON.stringify(state.itemList));
    },

    decrementQty(state, action: PayloadAction<number>) {
      const itemId = action.payload;
      const itemToUpdate = state.itemList.find((item) => item.id === itemId);
      if (itemToUpdate && itemToUpdate.quantity > 0) {
        itemToUpdate.quantity -= 1;
      }
      AsyncStorage.setItem("cartItems", JSON.stringify(state.itemList));
    },

    clearAllCartItems(state) {
      state.itemList = [];
      AsyncStorage.removeItem("cartItems");
    },

    setCartItems(state, action: PayloadAction<Item[]>) {
      state.itemList = action.payload;
      AsyncStorage.setItem("cartItems", JSON.stringify(state.itemList));
    },

    setFavoriteList(state, action: PayloadAction<Item[]>) {
      state.favoriteList = action.payload;
      AsyncStorage.setItem("favoriteItems", JSON.stringify(state.favoriteList));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  addToFavorite,
  removeFromFavorite,
  incrementQty,
  decrementQty,
  clearAllCartItems,
  setCartItems,
  setFavoriteList,
} = cartReducers.actions;

export default cartReducers.reducer;
