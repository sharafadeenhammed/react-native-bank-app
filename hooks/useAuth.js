import AuthStorage from "../utility/AuthStorage";
import { useContext } from "react";
import AuthContext from "../context/auth";
import cacheUser from "../utility/cacheUser";

export default () => {
  const { user, setUser } = useContext(AuthContext);

  const login = async (token, userData) => {
    await AuthStorage.store(token);
    setUser(userData);
    await cacheUser.store(userData);
  };

  const logout = async () => {
    await AuthStorage.remove();
    setUser({});
    await cacheUser.remove();
  };

  const getToken = async () => {
    return await AuthStorage.get();
  };

  return { user, login, logout, getToken };
};
