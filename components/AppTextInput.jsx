import { TextInput, View, StyleSheet } from "react-native";

import Icon from "./Icon";
import {
  dark,
  green,
  lightGray,
  mediumDark,
  veryLightGray,
} from "../config/colors";
const AppTextInput = ({
  style,
  secure,
  placeholder,
  onChangeText,
  keyboardType,
  inputType,
  iconName,
  iconColor,
  inputStyles,
  iconBackgroundcolor,
  clearButton,
  cursorColor,
  ...otherProps
}) => {
  return (
    <View style={[styles.container, style]}>
      {iconName && (
        <Icon
          name={iconName}
          color={iconColor}
          size={30}
          backgroundColor={iconBackgroundcolor}
          iconAdditonalStyles={styles.icon}
        />
      )}
      <TextInput
        style={[styles.input, inputStyles]}
        autoFocus={false}
        secureTextEntry={secure}
        placeholder={placeholder}
        inputMode={inputType}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        clearButtonMode={clearButton}
        cursorColor={cursorColor}
        verticalAlign={"top"}
        {...otherProps}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    padding: 5,
    overflow: "hidden",
    backgroundColor: veryLightGray,
  },
  icon: {
    padding: 0,
    borderRadius: 15,
    marginTop: 10,
  },
  input: {
    paddingVertical: 10,
    fontSize: 18,
    width: "100%",
    padding: 7,
    fontWeight: "500",
    marginLeft: 10,
    color: mediumDark,
  },
});
export default AppTextInput;

// default - numeric - email-address - phone-pad
