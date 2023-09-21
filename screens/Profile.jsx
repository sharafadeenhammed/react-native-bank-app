import { StyleSheet, View, Image, Linking } from "react-native";
import { useEffect, useState } from "react";

import useAuth from "../hooks/useAuth";
import ScroolScreen from "../components/ScroolScreen";
import AppText from "../components/AppText";
import {
  green,
  mediumDark,
  mediumRed,
  veryLightGray,
  white,
} from "../config/colors";
import ListCard from "../components/ListCard";
import AppButton from "../components/AppButton";
import useAccount from "../hooks/useAccount";
import accountApi from "../api/accountApi";
import ActivityIndicator from "../components/animations/ActivityIndicator";

const data = [
  {
    image: require("../assets/bank-image.png"),
    title: "About This App",
    description:
      "I am happy to have you here this is a simple bank app that imitate how bank app works. you can send, receive, funds, check transaction history, and more",
  },
  {
    image: require("../assets/documentation.png"),
    title: "Backend Documnetation",
    link: "https://documenter.getpostman.com/view/20324776/2s946iaqNP",
    description: "check the backend documentation click the button below",
    linkTitle: "Documentation",
  },
  {
    image: require("../assets/git-image.png"),
    title: "Clone Frontend",
    link: "https://github.com/sharafadeenhammed/react-native-bank-app",
    description:
      "You are welcome to clone the frontend and modify it however you want",
    linkTitle: "source code",
  },
  {
    image: require("../assets/git-image.png"),
    title: "Clone Backend",
    link: "https://github.com/sharafadeenhammed/bankapp-mongodb",
    description:
      "You are welcome to clone the backend and modify it however you want",
    linkTitle: "source code",
  },
];

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const account = useAccount();
  const fetchAccount = async () => {
    const data = await accountApi.getUserAccount();
    if (!data.ok) return setError(true);
    account.setUserAccount(data.data.data[0]);
    setLoading(false);
  };
  useEffect(() => {
    fetchAccount();
  }, []);
  const { user, logout } = useAuth();
  const date = new Date(user.createdAt);
  return loading ? (
    <ActivityIndicator animate={true} />
  ) : (
    <ScroolScreen style={styles.container}>
      {/* profile header section */}
      <View style={styles.userDash}>
        <Image style={styles.avatar} source={require("../assets/avatar.jpg")} />
        <View style={styles.nameContainer}>
          <AppText style={styles.dashText} text="Welcome" />
          <AppText
            style={styles.dashName}
          >{` ${user.first_name}  ${user.last_name}`}</AppText>
        </View>
      </View>

      <View style={[styles.subContainer, styles.section1]}>
        <AppText style={styles.headerSize3} text="User Details" />
        <AppText style={styles.textParagraph} text={`ID: ${user.id}`} />
        <AppText style={styles.textParagraph} text={`Email: ${user.email}`} />
        <AppText
          style={styles.textParagraph}
          text={`Phone Number: ${user.phone}`}
        />
        <AppText
          style={styles.textParagraph}
          text={`Address: ${user.address}`}
        />
        <AppText style={styles.textParagraph} text={`Age: ${user.age}`} />
        <AppText
          style={styles.textParagraph}
          text={`Active Since: ${date.toDateString()}    ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} `}
        />
        <AppButton
          bgColor={mediumRed}
          title={"Logout"}
          onPress={() => logout()}
        />
      </View>
      <View style={[styles.subContainer, styles.section1]}>
        {data.map((item, index) => (
          <ListCard
            key={index}
            item={item}
            onPress={() => Linking.openURL(item.link)}
          />
        ))}
      </View>
    </ScroolScreen>
  );
};

export default Profile;

const styles = StyleSheet.create({
  subContainer: {
    padding: 20,
  },
  headerSize3: {
    fontSize: 20,
    color: mediumDark,
    fontWeight: "600",
    marginBottom: 10,
  },
  avatar: {
    height: 150,
    width: 150,
    objectFit: "cover",
    marginBottom: 10,
    borderRadius: 75,
  },
  container: {
    padding: 10,
    paddingTop: 100,
  },
  nameContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  userDash: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  dashText: {
    fontSize: 15,
    fontWeight: "700",
    color: mediumDark,
    alignSelf: "flex-end",
    padding: 2,
    textTransform: "capitalize",
    textTransform: "capitalize",
  },
  dashName: {
    fontSize: 15,
    fontWeight: "700",
    color: white,
    marginLeft: 3,
    backgroundColor: green,
    padding: 2,
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textTransform: "capitalize",
  },
  textParagraph: {
    fontSize: 15,
    fontWeight: "500",
    margin: 10,
  },
  section1: {
    backgroundColor: veryLightGray,
  },
});
