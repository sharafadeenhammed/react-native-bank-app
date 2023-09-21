import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import AppText from "./AppText";
import { blue, green, mediumDark, white } from "../config/colors";
import AppButton from "./AppButton";

export default function ListCard({ item, style, onPress }) {
  return (
    <TouchableWithoutFeedback>
      <View style={[styles.cardContainer, style]}>
        <Image source={item.image} />
        <View style={styles.detailsContainer}>
          <AppText text={item.title} style={styles.mainTitle} />
          <AppText
            text={`${item.description}`}
            style={styles.description}
          ></AppText>
          {item.link ? (
            <AppButton
              bgColor={blue}
              onPress={onPress}
              buttonAdditionalStyles={{ borderRadius: 5 }}
              title={item.linkTitle}
            />
          ) : null}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  image: {
    height: 200,
    width: "100%",
  },
  button: {},
  cardContainer: {
    width: "100%",
    marginBottom: 20,
    backgroundColor: white,
    borderRadius: 20,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  detailsContainer: {
    marginTop: 20,
    width: "100%",
    paddingHorizontal: 10,
    display: "flex",
    paddingBottom: 20,
  },
  mainTitle: {
    fontSize: 20,
    textTransform: "capitalize",
    fontWeight: "600",
    marginBottom: 3,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  description: {
    fontWeight: "600",
    color: mediumDark,
    fontSize: 17,
  },
});
