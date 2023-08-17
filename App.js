import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Platform,
} from "react-native";
import { Line, Svg, SvgUri } from "react-native-svg";

export default function App() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchCoins = useCallback(async () => {
    try {
      let response = await axios.get("https://api.coinranking.com/v2/coins");
      setCoins(
        response.data.data.coins.filter((elem) => {
          return (
            elem.name !== "Solana" &&
            elem.name !== "Wrapped BTC" &&
            elem.uuid !== "qUhEFk1I61atv"
          );
        })
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchCoins();
  }, []);
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.AndroidSafeArea} />
      <ScrollView style={styles.containerScroll}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Top coins</Text>
          <View style={styles.topCoinsContainer}>
            {coins.slice(0, 5).map((elem) => {
              return (
                <View style={styles.topCoinsWrapper} key={elem.uuid}>
                  <SvgUri width={40} height={40} uri={elem.iconUrl} />
                  <Text style={styles.topCoinText}>{elem.symbol}</Text>
                </View>
              );
            })}
          </View>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Coins</Text>
        </View>
        <View style={styles.allCardsContainer}>
          {coins.map((elem) => {
            let sortedSparkline = [...elem.sparkline].sort();
            let maxValue = parseFloat(
              sortedSparkline[sortedSparkline.length - 1]
            );
            let minValue = parseFloat(sortedSparkline[0]);
            let referenceValue = maxValue - minValue;
            return (
              <View style={styles.cardContainer} key={elem.uuid}>
                <View style={styles.cardLeftSide}>
                  <View style={styles.logoContainer}>
                    <SvgUri width={36} height={36} uri={elem.iconUrl} />
                  </View>
                  <View style={styles.cardLeftSideText}>
                    <Text style={styles.cardLeftSideTextTitle}>
                      {elem.name}
                    </Text>
                    <View style={styles.cardLeftSideTextPriceContainer}>
                      <Text style={styles.cardLeftSideTextPrice}>
                        $
                        {parseFloat(elem.price).toLocaleString("en-US", {
                          maximumFractionDigits:
                            parseFloat(elem.price) < 2
                              ? 6
                              : parseFloat(elem.price) < 10
                              ? 5
                              : parseFloat(elem.price) < 100
                              ? 4
                              : parseFloat(elem.price) < 1000
                              ? 3
                              : parseFloat(elem.price) < 10000
                              ? 2
                              : 2,
                        })}
                      </Text>
                      <Text
                        style={
                          parseFloat(elem.change) > 0
                            ? styles.cardLeftSideTextPriceUp
                            : styles.cardLeftSideTextPriceDown
                        }
                      >
                        {parseFloat(elem.change) > 0 ? "+" : ""}
                        {parseFloat(elem.change)}%
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.cardRightSide}>
                  <Svg height="100%" width="100%">
                    {elem.sparkline.map((e, index) => {
                      if (index === 23) return null;
                      let y1Value =
                        100 -
                        ((parseFloat(e) - minValue) / referenceValue) * 100;
                      let y2Value =
                        100 -
                        (parseFloat(elem.sparkline[index + 1] - minValue) /
                          referenceValue) *
                          100;
                      return (
                        <Line
                          x1={`${index * 4.16}%`}
                          y1={`${y1Value}%`}
                          x2={`${(index + 1) * 4.16}%`}
                          y2={`${y2Value}%`}
                          stroke={parseFloat(elem.change) > 0 ? "green" : "red"}
                          strokeWidth="2"
                          key={index}
                        />
                      );
                    })}
                  </Svg>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  containerScroll: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 22,
  },
  titleText: {
    fontWeight: "700",
    fontSize: 24,
  },
  titleContainer: {
    paddingVertical: 8,
  },
  topCoinsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12,
  },
  allCardsContainer: {
    paddingBottom: 22,
  },
  cardContainer: {
    padding: 12,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.05,
    elevation: 4,
    width: "100%",
    height: 60,
    justifyContent: "center",
    marginBottom: 12,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardLeftSide: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    maxWidth: "70%",
    overflow: "hidden",
  },
  cardLeftSideText: {
    gap: 4,
  },
  cardLeftSideTextTitle: {
    fontWeight: "700",
  },
  cardLeftSideTextPriceContainer: {
    flexDirection: "row",
    gap: 8,
  },
  cardLeftSideTextPrice: {
    color: "#B5B5B5",
  },
  cardLeftSideTextPriceUp: {
    color: "#52AE26",
  },
  cardLeftSideTextPriceDown: {
    color: "#E12323",
  },
  logoContainer: {
    width: 38,
    height: 38,
    justifyContent: "center",
  },
  cardRightSide: {
    width: "30%",
    height: "100%",
  },
  topCoinsWrapper: {
    gap: 4,
    alignItems: "center",
  },
  topCoinText: {
    color: "#B5B5B5",
  },
  AndroidSafeArea: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
