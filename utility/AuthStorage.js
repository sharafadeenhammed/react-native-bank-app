import * as SecureStore from "expo-secure-store";

const name = "token";
const store = async (token) => {
  try {
    await SecureStore.setItemAsync(name, token);
  } catch (error) {
    console.log("failed to store token to secure store: ", error);
  }
};

const get = async () => {
  try {
    return await SecureStore.getItemAsync(name);
  } catch (error) {
    console.log("failed to retrive data from secure store: ", error);
  }
};

const remove = async () => {
  try {
    await SecureStore.deleteItemAsync(name);
  } catch (error) {
    console.log("error removing dat from secure store: ", error);
  }
};

export default {
  get,
  remove,
  store,
};
