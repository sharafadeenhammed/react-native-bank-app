import { StyleSheet, View, StatusBar } from "react-native";
import * as Clipboard from "expo-clipboard";
import { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import accountApi from "../api/accountApi";
import Screen from "../components/Screen";
import ActivityIndicator from "../components/animations/ActivityIndicator";
import { mediumBlue, mediumDark, white } from "../config/colors";
import AppText from "../components/AppText";
import useAccount from "../hooks/useAccount";

const Account = ({ navigation }) => {
  const account = useAccount();
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState({});
  const [isError, setError] = useState({});
  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const fetchAccount = async () => {
    setError(false);
    setLoading(true);
    const data = await accountApi.getUserAccount();
    if (!data.ok) return setError(true);
    setData(data.data.data[0]);
    account.setUserAccount(data.data.data[0]);
    setError(false);
    setLoading(false);
  };

  useEffect(() => {
    fetchAccount({ navigation });
  }, []);
  return (
    <Screen style={{ paddingTop: 0 }}>
      {isLoading ? <ActivityIndicator animate={true} /> : null}

      {isError ? (
        <View
          style={{
            height: "100%",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AppText
            style={{ fontSize: 20, fontWeight: "600" }}
            text={"Error Loading Your Account Info."}
          />
        </View>
      ) : null}

      {!isLoading && !isError ? (
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.refresh}>
              <MaterialCommunityIcons
                onPress={fetchAccount}
                name="refresh-circle"
                color={white}
                size={30}
              />
            </View>
            <AppText
              style={{ ...styles.headerText, marginBottom: 10 }}
              text={`${data.account_holder_name}`}
            />
            <AppText
              style={{ ...styles.headerText, marginBottom: 10 }}
              text="Current Balance"
            />
            <AppText style={styles.balance}>{` ${format.format(
              data.balance
            )}`}</AppText>
          </View>

          <View style={styles.body}>
            <View style={styles.accountContainer}>
              <AppText
                style={styles.accountText}
                text={` Account number:  ${data.account_number}`}
              />
              <MaterialCommunityIcons
                style={{ marginLeft: 20 }}
                name="content-copy"
                size={20}
                onPress={async () => {
                  console.log(data.account_number);
                  try {
                    await Clipboard.setStringAsync(`${data.account_number}`);
                    alert("acoount Number copied to clipboard");
                  } catch (error) {
                    console.log("clipboard error: ", error);
                  }
                }}
              />
            </View>

            <View style={styles.accountContainer}>
              <AppText style={styles.accountText} text={` ID:  ${data.id}`} />
            </View>

            <View style={styles.accountContainer}>
              <AppText
                style={styles.accountText}
                text={` Account Type:  ${data.account_type}`}
              />
            </View>
          </View>
        </View>
      ) : null}
    </Screen>
  );
};

export default Account;

const styles = StyleSheet.create({
  accountContainer: {
    paddingVertical: 20,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  body: {
    width: "100%",
    padding: 20,
  },
  header: {
    paddingTop: StatusBar.currentHeight + 50,
    alignItems: "center",
    height: 300,
    width: "100%",
    backgroundColor: mediumBlue,
    position: "relative",
  },
  headerText: {
    color: white,
    fontSize: 20,
    fontWeight: "600",
  },
  balance: {
    color: white,
    fontSize: 18,
  },
  accountText: {
    color: mediumDark,
    fontSize: 20,
    fontWeight: "600",
  },
  refresh: {
    position: "absolute",
    right: 20,
    top: StatusBar.currentHeight + 10,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: white,
    width: 40,
    borderRadius: 20,
  },
});
