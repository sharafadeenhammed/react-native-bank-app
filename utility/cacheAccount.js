import AsyncStorage from "@react-native-async-storage/async-storage";

const key = "account";

const store = async (value) => {
  try {
    const item = {
      value,
      timeStamp: Date.now(),
    };
    await AsyncStorage.setItem(key, JSON.stringify(item));
    return true;
  } catch (error) {
    console.log(error);
  }
};

const get = async () => {
  try {
    const value = await AsyncStorage.getItem(key);
    const item = JSON.parse(value);
    return item.value;
  } catch (error) {
    console.log("get data from async Storage Error: ", error);
    return null;
  }
};

export default {
  store,
  get,
};
