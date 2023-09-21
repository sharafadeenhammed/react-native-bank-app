import { Text, StyleSheet } from "react-native";

export default function AppText({ onPress, text, style, children }) {
  return (
    <Text onPress={onPress} style={[styles.text, style]}>
      {text}
      {children}
    </Text>
  );
}
const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontWeight: "400",
  },
});
