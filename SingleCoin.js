import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SingleCoin({ route, navigation }) {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={styles.backContainer}>
          <TouchableOpacity
            style={styles.row}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text style={styles.row}>Back</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.contentContainer}>
          <Text>{JSON.stringify(route.params)}</Text>
        </View>
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
  row: {
    flexDirection: "row",
    alignItems: "center",
    color: "#0E7AFE",
    fontSize: 18,
  },
  backContainer: {
    paddingVertical: 12,
    paddingHorizontal: 22,
  },
  contentContainer: {
    flex: 1,
  },
});
