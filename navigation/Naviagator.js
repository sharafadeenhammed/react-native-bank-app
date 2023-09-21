import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./AuthNavigator";
import { useContext } from "react";
import AuthContext from "../context/auth";
import AppNavigator from "./AppNavigator";
import { useEffect } from "react";
import cacheUser from "../utility/cacheUser";
import navigationTheme from "./navigationTheme";

export default () => {
  const { setUser, user } = useContext(AuthContext);
  const iniitlizeApp = async () => {
    const user = await cacheUser.get();
    setUser(user);
  };
  useEffect(() => {
    iniitlizeApp();
  }, []);

  return (
    <NavigationContainer theme={navigationTheme}>
      {user?.id == null ? <AuthNavigator /> : <AppNavigator />}
    </NavigationContainer>
  );
};
