import { SafeAreaView, StyleSheet, ScrollView, StatusBar } from "react-native";

export default function ScroolScreen({ children, style }) {
  return (
    <SafeAreaView style={[styles.container, style]}>
      <ScrollView
        style={{ flex: 1, width: "100%" }}
        showsVerticalScrollIndicator={false}
        horizontal={false}
        onScrollAnimationEnd={true}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingTop: StatusBar.currentHeight,
    margin: 0,
  },
});
