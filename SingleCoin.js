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
import { SvgUri } from "react-native-svg";

export default function SingleCoin({ route, navigation }) {
  let { coin } = route.params;
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
          <View style={styles.titleContainer}>
            <SvgUri width={100} height={100} uri={coin.iconUrl} />
            <Text style={styles.titleText}>{coin.name}</Text>
          </View>
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
    paddingHorizontal: 22,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 36,
  },
  titleText: {
    fontSize: 36,
    fontWeight: "700",
    paddingLeft: 36,
    flexWrap: "wrap",
    flexShrink: 1,
  },
});
