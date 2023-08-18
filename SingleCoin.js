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
import { Line, Polygon, Svg, SvgUri } from "react-native-svg";

export default function SingleCoin({ route, navigation }) {
  let { coin } = route.params;
  let sortedSparkline = [...coin.sparkline].sort();
  let maxValue = parseFloat(sortedSparkline[sortedSparkline.length - 1]);
  let minValue = parseFloat(sortedSparkline[0]);
  let referenceValue = maxValue - minValue;

  let computedPointsArray = coin.sparkline.map((elem, index) => {
    if (index === 23) return "";
    let y1Value = 100 - ((parseFloat(elem) - minValue) / referenceValue) * 100;
    let y2Value =
      100 -
      (parseFloat(coin.sparkline[index + 1] - minValue) / referenceValue) * 100;
    return `${index * 4.16 + index * 0.24},${y1Value} ${
      (index + 1) * 4.16 + (index + 1) * 0.24
    },${y2Value} `;
  });
  let computedPoints = `0,100 ${computedPointsArray.join("")} 100,100 0,100`;
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
          <View style={styles.infoRow}>
            <View style={styles.leftInfoContainer}>
              <Text style={styles.infoTopText}>Symbol</Text>
              <Text style={styles.infoBottomText}>{coin.symbol}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoTopText}>Tier</Text>
              <Text style={styles.infoBottomText}>{coin.tier}</Text>
            </View>
            <View style={styles.rightInfoContainer}>
              <Text style={styles.infoTopText}>Rank</Text>
              <Text style={styles.infoBottomText}>{coin.rank}</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <View style={styles.leftInfoContainer}>
              <Text style={styles.infoTopText}>Price</Text>
              <Text style={styles.infoBottomText}>
                $
                {parseFloat(coin.price).toLocaleString("en-US", {
                  maximumFractionDigits:
                    parseFloat(coin.price) < 2
                      ? 6
                      : parseFloat(coin.price) < 10
                      ? 5
                      : parseFloat(coin.price) < 100
                      ? 4
                      : parseFloat(coin.price) < 1000
                      ? 3
                      : parseFloat(coin.price) < 10000
                      ? 2
                      : 2,
                })}
              </Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoTopText}>BTC Price</Text>
              <Text style={styles.infoBottomText}>
                {parseFloat(coin.btcPrice).toLocaleString("en-US", {
                  maximumFractionDigits:
                    parseFloat(coin.btcPrice) < 2
                      ? 6
                      : parseFloat(coin.btcPrice) < 10
                      ? 5
                      : parseFloat(coin.btcPrice) < 100
                      ? 4
                      : parseFloat(coin.btcPrice) < 1000
                      ? 3
                      : parseFloat(coin.btcPrice) < 10000
                      ? 2
                      : 2,
                })}
              </Text>
            </View>
            <View style={styles.rightInfoContainer}>
              <Text style={styles.infoTopText}>Change</Text>
              <Text
                style={
                  parseFloat(coin.change) > 0
                    ? styles.PriceUp
                    : styles.PriceDown
                }
              >
                {parseFloat(coin.change) > 0 ? "+" : ""}
                {parseFloat(coin.change)}%
              </Text>
            </View>
          </View>
          <View style={styles.chartContainer}>
            <Svg
              height="100%"
              width="100%"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {coin.sparkline.map((e, index) => {
                if (index === 23) return null;
                let y1Value =
                  100 - ((parseFloat(e) - minValue) / referenceValue) * 100;
                let y2Value =
                  100 -
                  (parseFloat(coin.sparkline[index + 1] - minValue) /
                    referenceValue) *
                    100;
                return (
                  <>
                    <Line
                      x1={`${index * 4.16 + index * 0.24}`}
                      y1={`${y1Value}`}
                      x2={`${(index + 1) * 4.16 + (index + 1) * 0.24}`}
                      y2={`${y2Value}`}
                      stroke={parseFloat(coin.change) > 0 ? "green" : "red"}
                      strokeWidth="2"
                      key={index}
                      vectorEffect="non-scaling-stroke"
                    />
                  </>
                );
              })}
              <Polygon
                points={computedPoints}
                fill={parseFloat(coin.change) > 0 ? "green" : "red"}
                stroke={parseFloat(coin.change) > 0 ? "green" : "red"}
                opacity={0.22}
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            </Svg>
          </View>
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
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 22,
  },
  leftInfoContainer: {
    gap: 2,
  },
  infoContainer: {
    alignItems: "center",
    gap: 2,
  },
  rightInfoContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    minWidth: 50,
  },
  infoTopText: {
    fontWeight: "700",
  },
  infoBottomText: {
    fontWeight: "600",
    color: "#B5B5B5",
  },
  PriceUp: {
    color: "#52AE26",
    fontWeight: "600",
  },
  PriceDown: {
    color: "#E12323",
    fontWeight: "600",
  },
  chartContainer: {
    height: 200,
    width: "100%",
    marginTop: 40,
  },
});
