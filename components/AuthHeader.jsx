import { StyleSheet, Text, View, StatusBar } from "react-native";
import { white } from "../config/colors";
import { FontAwesome5 } from "@expo/vector-icons";

const AuthHeader = ({
  backgroundColor,
  style,
  iconColor,
  icon = "money-check-alt",
  text,
  color,
}) => {
  const headerStyle = backgroundColor ? { backgroundColor } : {};
  const textColor = color ? { color } : {};
  return (
    <View style={[styles.headerContainer, headerStyle, style]}>
      <View style={[styles.iconContainer]}>
        <FontAwesome5 color={iconColor || white} name={icon} size={60} />
      </View>
      <Text style={[styles.headerText, textColor]}>{text}</Text>
    </View>
  );
};

export default AuthHeader;

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    color: white,
    fontSize: 20,
    fontWeight: "700",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
});
