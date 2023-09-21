import { StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";
const loader = require("../../animations/loader.json");

const ActivityIndicator = ({ animate = false, style = {} }) => {
  return animate ? (
    <View style={[styles.container, style]}>
      <LottieView source={loader} autoPlay={true} loop={true} />
    </View>
  ) : null;
};

export default ActivityIndicator;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
