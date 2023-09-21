import { StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "./AppText";
import {
  green,
  red,
  veryLightGreen,
  veryLightRed,
  veryLightYellow,
  yellow,
} from "../config/colors";
const FalshMessage = ({
  message,
  type = "success",
  flashMessageAdditionalStyle,
}) => {
  return (
    <>
      {message && type == "error" ? (
        <View style={[styles.errorContainer, flashMessageAdditionalStyle]}>
          <MaterialCommunityIcons size={17} name="cancel" color={red} />
          <AppText style={styles.errorText} text={message} />
        </View>
      ) : null}
      {message && type == "warning" ? (
        <View style={[styles.warningContainer, flashMessageAdditionalStyle]}>
          <MaterialCommunityIcons
            size={17}
            name="exclamation-thick"
            color={yellow}
          />
          <AppText style={styles.warningText} text={message} />
        </View>
      ) : null}
      {message && type == "success" ? (
        <View style={[styles.successContainer, flashMessageAdditionalStyle]}>
          <MaterialCommunityIcons name="check-circle" size={17} color={green} />
          <AppText style={styles.successText} text={message} />
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    width: "100%",
    backgroundColor: veryLightRed,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",

    borderRadius: 3,
  },
  errorText: {
    color: red,
    marginLeft: 10,
  },
  successContainer: {
    width: "100%",
    backgroundColor: veryLightGreen,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: green,
    borderRadius: 3,
  },
  successText: {
    marginLeft: 10,
    color: green,
  },
  warningContainer: {
    width: "100%",
    backgroundColor: veryLightYellow,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: yellow,
    borderRadius: 3,
  },
  warningText: {
    color: yellow,
    marginLeft: 10,
  },
});

export default FalshMessage;
