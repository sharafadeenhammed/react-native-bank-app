import { View, StatusBar, StyleSheet } from "react-native";

function Screen({ style, children }) {
  return <View style={[styles.container, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingTop: StatusBar.currentHeight,
  },
});

export default Screen;
