import AsyncStorage from "@react-native-async-storage/async-storage";

const key = "user";

const store = async (value) => {
  try {
    const item = {
      value,
      timeStamp: Date.now(),
    };
    await AsyncStorage.setItem(key, JSON.stringify(item));
    return true;
  } catch (error) {
    console.log("storing user data to async storage error: ", error);
    return null;
  }
};

const get = async () => {
  try {
    const value = await AsyncStorage.getItem(key);
    const item = JSON.parse(value);
    return item.value;
  } catch (error) {
    console.log("get user data from async storage Error: ", error);
    return null;
  }
};

const remove = async () => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log("removing user data from async storage error: ", error);
    return null;
  }
};

export default {
  store,
  get,
  remove,
};
