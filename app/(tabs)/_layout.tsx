import React, { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, Text, View } from "react-native";

import Colors, { DarkModeColors } from "@/constants/Colors";
import { CartTypeState } from "@/assets/types";
import { useSelector } from "react-redux";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const cart = useSelector(  
    (state: { cart: CartTypeState }) => state.cart.itemList
  );
  const cartItemCount = cart.length;
  
  return (
    <Tabs 
      screenOptions={{
        tabBarActiveTintColor: DarkModeColors.secondary,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        // headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{  
          title: "Home",
          headerTitle: "Abd-Commerce",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <View>
                    <View className="w-6 h-6 scale-75 bg-red-600 z-30 absolute top-[2%] right-[10%] rounded-full ">
                      {/* Dynamic Items */}
                      <Text className="text-white text-base text-center">
                     {cartItemCount}
                      </Text>
                    </View>
                    <FontAwesome
                      name="shopping-cart"
                      size={25}
                      color={DarkModeColors.accent}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  </View>
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="favorite"
        options={{
          title: "Favorite",
          tabBarIcon: ({ color }) => <TabBarIcon name="heart" color={color} />,
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          title: "Account",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}
