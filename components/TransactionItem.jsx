import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppText from "./AppText";
import {
  green,
  red,
  veryLightGray,
  veryLightGreen,
  veryLightRed,
} from "../config/colors";

const TransactionItem = ({ item, account }) => {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            item.beneficiary_account_number == account.account_number
              ? veryLightGreen
              : veryLightRed,
        },
      ]}
    >
      <View>
        <AppText text={item.beneficiary_name} />
        <AppText text={item.beneficiary_account_number} />
      </View>
      {item.beneficiary_account_number == account.account_number ? (
        <AppText style={{ color: green }} text={`+${item.amount}`} />
      ) : (
        <AppText style={{ color: red }} text={`-${item.amount}`} />
      )}
    </View>
  );
};

export default TransactionItem;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: veryLightGray,
  },
});
