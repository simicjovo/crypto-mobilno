import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "./MainScreen";
import SingleCoin from "./SingleCoin";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Home"
      >
        <Stack.Screen name="Home" component={MainScreen} />
        <Stack.Screen name="SingleCoin" component={SingleCoin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
