import { StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import useApi from "../hooks/useApi";
import transactionApi from "../api/transactionApi";
import useAccount from "../hooks/useAccount";
import TransactionItem from "../components/TransactionItem";
import ActivityIndicator from "../components/animations/ActivityIndicator";
import Screen from "../components/Screen";
import AppText from "../components/AppText";

const Transctions = () => {
  const [sortData, setSortData] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const account = useAccount();
  const transaction = useApi(transactionApi.getTransactions);
  const getTransactions = async () => {
    await transaction.request(account.account);
    const sortData = transaction.dataRef.current.data;
    sortData.sort((a, b) => {
      const timeA = new Date(a.created_at);
      const timeB = new Date(b.created_at);
      return timeB - timeA;
    });
    setSortData(sortData);
  };
  useEffect(() => {
    getTransactions();
  }, []);
  return transaction.isLodading ? (
    <ActivityIndicator animate={true} />
  ) : (
    <Screen style={styles.container}>
      {!transactionApi.isLodading && sortData.length == 0 ? (
        <AppText style={styles.headerText} text={"No Transactions Yet"} />
      ) : null}
      {sortData.length > 0 ? (
        <FlatList
          refreshing={refresh}
          onRefresh={async () => {
            setRefresh(true);
            await getTransactions();
            setRefresh(false);
          }}
          data={sortData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TransactionItem item={item} account={account.account} />
          )}
        />
      ) : null}
    </Screen>
  );
};

export default Transctions;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  headerText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
  },
});
