import { DefaultTheme } from "@react-navigation/native";
import { orange, white } from "../config/colors";

export default {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, primary: orange, background: white },
};
