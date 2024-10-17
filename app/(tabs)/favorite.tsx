import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartTypeState, Item } from "../../assets/types";
import { FontAwesome } from "@expo/vector-icons";
import {
  removeFromFavorite,
  setFavoriteList,
} from "@/redux/reducers/cartReducers"; // Import the necessary actions from your Redux slice
import AsyncStorage from "@react-native-async-storage/async-storage";
// import AsyncStorage from "@react-native-async-storage/async-storage";

const FavoritePage = () => {
  const dispatch = useDispatch();
  const favorite = useSelector(
    (state: { cart: CartTypeState }) => state.cart.favoriteList
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const savedFavorites = await AsyncStorage.getItem("favoriteList");
        if (savedFavorites) {
          dispatch(setFavoriteList(JSON.parse(savedFavorites)));
        }
      } catch (error) {
        console.error("Error fetching favorite items: ", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchFavorites();
  }, [dispatch]);

  const handleToggleFavorite = async (item: Item) => {
    dispatch(removeFromFavorite(item.id));
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View className="h-full ">
      {favorite.length === 0 ? (
        <Text
          style={{
            textAlign: "center",
            fontSize: 18,
            fontWeight: "bold",
            color: "white",
          }}
        >
          No Favorite Yet
        </Text>
      ) : (
        <FlatList
          data={favorite}
          renderItem={({ item }) => (
            <View style={{ marginBottom: 20 }}>
              <View className="h-32 mt-3 bg-lightGrayAccent px-3 rounded-2xl items-center flex-row justify-between mx-2">
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
                      ${item.price}
                    </Text>
                  </View>
                </View>
                {/* Card controllers */}
                <FontAwesome
                  name="heart"
                  onPress={() => handleToggleFavorite(item)}
                  color="red" // Assuming that items in the cart are always favorites
                  size={24}
                />
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default FavoritePage;
