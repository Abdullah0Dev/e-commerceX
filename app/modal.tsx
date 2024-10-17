import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { CartStateSlice } from "../types";
import { Fontisto } from "@expo/vector-icons";
import {
  addToCart,
  removeFromCart,
  addToFavorite,
  removeFromFavorite,
  incrementQty,
  decrementQty,
  clearAllCartItems,
} from "@/redux/reducers/cartReducers"; // Import the necessary actions from your Redux slice
import { CartTypeState } from "@/assets/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import AsyncStorage from "@react-native-async-storage/async-storage";
const CardModal = () => {
  const dispatch = useDispatch();
  const cart = useSelector(  
    (state: { cart: CartTypeState }) => state.cart.itemList
  );
  console.log("Here is the cart Content", cart);
  const [loading, setLoading] = useState(false);
  // check purpose
  const handleDecrement = (id: number, quantity: number) => {
    if (quantity === 1) {
      dispatch(removeFromCart(id));  
    } else {
      dispatch(decrementQty(id));
    }
  };
  const handleIncrement = (id: number) => {
    dispatch(incrementQty(id));
  };
  const handleClearCart = () => {
    AsyncStorage.removeItem("cartItems");
    dispatch(clearAllCartItems()); // Dispatch clearCartItems action
  };
  // Calculate total price dynamically
  const totalPrice = cart.reduce(  
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <View className="h-full ">
      {cart.length === 0 ? (
        <Text
          style={{
            textAlign: "center",
            fontSize: 18,
            fontWeight: "bold",
            color: "white",
          }}
        >
          Cart is empty
        </Text>
      ) : (
        cart.map((item) => (
          <View key={item.id} style={{ marginBottom: 20 }}>
            <View className="h-32 mt-3 bg-lightGrayPrimary/20 px-3 rounded-2xl items-center flex-row justify-between mx-2">
              {/* Image & Name */}
              <View className="flex-row items-center  gap-4">
                <Image
                  source={{ uri: item.image }}
                  className="w-24 h-24 rounded-xl"
                />
                <View className="items-center">
                  <Text className="text-white text-xl font-bold">
                    {item.name}
                  </Text>
                  <Text className="text-white/80 text-lg font-bold">
                    ${item.price * item.quantity}
                  </Text>
                </View>
              </View>
              {/* Card controllers */}
              <View className="items-center">
                <TouchableOpacity
                  onPress={() => handleDecrement(item.id, item.quantity)}
                  className="bg-white w-7 scale-90 h-7 rounded-full items-center "
                >
                  <Text className="text-3xl scale-150 -mt-1">-</Text>
                </TouchableOpacity>
                <Text className="text-lg font-bold py-1 text-cyan-50">
                  {item.quantity}
                </Text>
                <TouchableOpacity
                  onPress={() => handleIncrement(item.id)}
                  className="bg-lightPrimary  w-7 scale-90 h-7 rounded-full items-center "
                >
                  <Text className="text-3xl  text-black -mt-1">+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))
      )}
      <View className="absolute bottom-0 h-32 w-full flex-row pl-3 justify-around items-center bg-slate-500 rounded-t-xl">
        <Text className="text-2xl font-bold">${totalPrice}</Text>
        <Fontisto
          name="trash"
          size={24}
          color="white"
          onPress={handleClearCart}
        />
        <TouchableOpacity className="bg-blue-300 px-4 py-2   rounded-full items-center ">
          <Text className="text-xl font-bold  text-white ">Check out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default CardModal;
