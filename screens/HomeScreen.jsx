import { StyleSheet, View, ImageBackground, StatusBar } from "react-native";
import Screen from "../components/Screen";
import BackgroudImage from "../assets/splashscreen_image.png";
import AppButton from "../components/AppButton";
import { green, orange, white } from "../config/colors";
import AuthHeader from "../components/AuthHeader";

const HomeScreen = ({ navigation }) => {
  return (
    <Screen style={{ paddingTop: 0 }}>
      <ImageBackground
        style={styles.backgroundContainer}
        resizeMode="cover"
        source={BackgroudImage}
      >
        <View style={styles.headerContainer}>
          <AuthHeader iconColor={white} text="Experience Digital Banking" />
        </View>
        <View style={styles.buttonContainer}>
          <AppButton
            onPress={() => navigation.navigate("Login")}
            bgColor={orange}
            title="sign in"
          />
          <AppButton
            onPress={() => navigation.navigate("Register")}
            bgColor={green}
            title="Register"
          />
        </View>
      </ImageBackground>
    </Screen>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  backgroundContainer: {
    position: "relative",
    flex: 1,
    justifyContent: "flex-end",
  },
  buttonContainer: {
    paddingHorizontal: 10,
  },
  headerContainer: {
    position: "absolute",
    top: StatusBar.currentHeight + 5,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});
