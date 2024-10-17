import { View, Text, Image, FlatList, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useDispatch } from "react-redux";
// import { CartItem } from "./types"; // Assuming you have a RootState type defined in types.ts
// import { addItem, removeItem } from "@/redux/slices/cartSlice";
import products from "@/assets/data/products";
import { addToCart } from "@/redux/reducers/cartReducers";
import { Item } from "@/assets/types";
const SIZES = ["small", "medium", "large", "X-large"];

const DetailsPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const prod = products.find((item) => item.id.toString() === id);

  //   const [product, setProduct] = useState<CartItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  const handleAddToCart = (item: Item) => {
    setAdded(true);
    dispatch(addToCart(item)); 
  };
  const removeFromCard = () => {
    router.push(`/modal`);
  };

  return (
    <View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Image
          source={{
            uri: prod?.image,
            // || `https://png.pngtree.com/png-vector/20210604/ourmid/pngtree-gray-network-placeholder-png-image_3416659.jpg`,
          }}
          className="w-96 rounded-3xl  self-center h-72"
        />
      </View>
      {/* Title and Price */}
      <View className="flex-row items-center justify-between mx-5 mt-5">
        <Text className="text-2xl font-bold text-lightGraySecondary">
          {prod?.name}
        </Text>
        <Text className="text-2xl underline font-bold text-lightGraySecondary/80 ">
          ${prod?.price}
        </Text>
      </View>
      {/* Product Sizes */}
      <View className="mt-5">
        <FlatList
          data={SIZES}
          renderItem={({ item }) => (
            <Pressable className="text-center items-center">
              <Text className="text-lightGraySecondary/80 py-2 px-3 rounded-xl bg-white text-xl w-fit">
                {item}
              </Text>
            </Pressable>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 30 }}
        />
      </View>
      {/* Title and Description */}
      <View className="mt-5 mx-3">
        <Text className="text-xl font-bold text-lightGrayPrimary/70 ">
          Description
        </Text>
        <Text className="text-lg text-lightGrayPrimary/50">
          {prod?.description}
        </Text>
      </View>
      {/* Add to Card */}
      {!added ? (
        <Pressable
          className=" mt-5"
          onPress={() => handleAddToCart(prod)}
        >
          <Text className="text-yellow-50 text-center py-4 px-3 bg-gray-600 rounded-xl mx-5 text-xl">
            ADD TO CART
          </Text>
        </Pressable>
      ) : (
        <Pressable
          className=" mt-5"
          onPress={() => removeFromCard(prod)}
        >  
          <Text className="text-yellow-50 text-center py-4 px-3 bg-gray-600 rounded-xl mx-5 text-xl">
            check the card
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default DetailsPage;
