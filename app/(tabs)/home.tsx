import { FlatList, TextInput } from "react-native";
import products from "@/assets/data/products";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Redirect, useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { CartTypeState, Item } from "@/assets/types";
import {
  addToFavorite,
  removeFromFavorite,
} from "@/redux/reducers/cartReducers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "@/FirebaseConfig";

const ItemCard = ({ item }: any) => {
  const dispatch = useDispatch();
  // const [isFavorite, setIsFavorite] = useState(false);
  // get the favorite lists
  const itemLists = useSelector(
    (state: { cart: CartTypeState }) => state.cart.favoriteList
  );
  const isFavorite = itemLists.some((favItem) => favItem.id === item.id);
  const handleToggleFavorite = async () => {
    if (isFavorite) {
      dispatch(removeFromFavorite(item.id));
      try {
        // Remove item from AsyncStorage
        const storedFavorites = await AsyncStorage.getItem("favoriteList");
        if (storedFavorites) {
          const updatedFavorites = JSON.parse(storedFavorites).filter(
            (favItem: Item) => favItem.id !== item.id
          );
          await AsyncStorage.setItem(
            "favoriteList",
            JSON.stringify(updatedFavorites)
          );
        }
      } catch (error) {
        console.error("Error removing item from AsyncStorage: ", error);
      }
    } else {
      dispatch(addToFavorite(item));
      try {
        // Add item to AsyncStorage
        const storedFavorites = await AsyncStorage.getItem("favoriteList");
        if (storedFavorites) {
          const updatedFavorites = [...JSON.parse(storedFavorites), item];
          await AsyncStorage.setItem(
            "favoriteList",
            JSON.stringify(updatedFavorites)
          );
        } else {
          await AsyncStorage.setItem("favoriteList", JSON.stringify([item]));
        }
      } catch (error) {
        console.error("Error adding item to AsyncStorage: ", error);
      }
    }
  };
  const router = useRouter();

  const handleItemPress = () => {
    router.push(`/${item.id}`);
  };
  return (
    <View
      className="bg-lightPrimary mx-2 my-3"
      style={styles.productsContainer}
    >
      <View
        style={{
          position: "relative",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          paddingTop: 9,
          paddingRight: 9,
          borderRadius: 50,
          backgroundColor: "transparent",
        }}
      >
        <FontAwesome
          name="heart"
          onPress={handleToggleFavorite}
          color={isFavorite ? "red" : "#F2F2F2"}
          size={24}
        />
      </View>
      <Pressable onPress={handleItemPress}>
        <Image
          source={{
            uri: item.image,
          }}
          style={styles.image}
        />
      </Pressable>

      <Pressable onPress={handleItemPress}>
        <View style={styles.ProductInfo}>
          <Text className=" text-xl font-pmedium">{item.name}</Text>
          <Text className="text-base ">${item.price}</Text>
        </View>
      </Pressable>
    </View>
  );
};

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [numColumns, setNumColumns] = useState(2);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
      console.log(`User:`, user);
    });
  }, []);

  useEffect(() => {
    const screenWidth = Dimensions.get("window").width;
    const cols = Math.floor(screenWidth / 180);
    setNumColumns(cols > 0 ? cols : 1);
  }, []);

  const handleSearch = () => {
    const filtered = products.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleSearchSubmit = () => {
    handleSearch();
  };

  const handleSearchInputChange = (text: string) => {
    setSearchQuery(text);
  };

  const handleSearchInputSubmit = () => {
    handleSearch();
  };
  return (
    <View>
      {/* {!user && ( <Redirect href={`/auth`} />) }   */}  
        <View>    
          <View className="">
            <TextInput
              placeholder="Search products..."
              value={searchQuery}
              onChangeText={handleSearchInputChange}
              onSubmitEditing={handleSearchInputSubmit}
              keyboardType="name-phone-pad"
              autoCapitalize="none"
              className=" h-14 text-base px-2 py-1 rounded-xl bg-lightPrimary/80 mt-5 mx-5"
            />
            <FontAwesome
              name="search"
              onPress={handleSearchSubmit}
              color={`#3d3d3d`}
              style={{
                fontSize: 20,
                position: "absolute",
                top: "50%",
                right: `8%`,
              }}  
            />
          </View>
          <FlatList
            data={filteredProducts}
            renderItem={({ item }) => <ItemCard item={item} />}
            contentContainerStyle={{ gap: 5, alignItems: "center" }}
            key={numColumns} // Change key prop when numColumns changes
            numColumns={numColumns}
          />
        </View>
   
    </View>
  );
};
// Ultimate

export default HomePage;
const styles = StyleSheet.create({
  productsContainer: {
    width: 185,
    height: 310,
    borderRadius: 15,
  },
  image: {
    width: 180,
    aspectRatio: 1 / 1,
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  ProductInfo: {
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 9,
  },
});
