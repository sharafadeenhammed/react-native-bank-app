import AsyncStorage from "@react-native-async-storage/async-storage";

const prefix = "cache";
const expireryInMinites = 30;

const store = async (key, value) => {
  try {
    const item = {
      value,
      timeStamp: Date.now(),
    };
    const storeResponse = await AsyncStorage.setItem(
      prefix + key,
      JSON.stringify(item)
    );
    return true;
  } catch (error) {
    console.log(error);
  }
};

const get = async (key) => {
  try {
    const value = await AsyncStorage.getItem(prefix + key);
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
