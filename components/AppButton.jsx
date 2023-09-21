import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { darkBg, white } from "../config/colors";

export default function AppButton({
  bgColor,
  title,
  onPress,
  textColor,
  buttonAdditionalStyles,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[
        styles.buttton,
        { backgroundColor: bgColor ?? darkBg },
        buttonAdditionalStyles,
      ]}
    >
      <Text style={[styles.text, { color: textColor ?? white }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttton: {
    borderRadius: 30,
    width: "100%",
    minHeight: 40,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    alignSelf: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 18,
    textTransform: "capitalize",
  },
});
