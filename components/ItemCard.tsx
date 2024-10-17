import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const ItemCard = ({ item }: any) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
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
export default ItemCard;
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
