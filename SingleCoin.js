import { View, Text, StyleSheet, Platform, StatusBar } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SingleCoin({ route, navigation }) {
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text>{JSON.stringify(route.params)}</Text>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  AndroidSafeArea: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
