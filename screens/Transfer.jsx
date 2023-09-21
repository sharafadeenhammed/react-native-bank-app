import { Alert, StyleSheet, View } from "react-native";
import * as yup from "yup";
import { Formik } from "formik";
import ActivityIndicator from "../components/animations/ActivityIndicator";

import AppTextInput from "../components/AppTextInput";
import { dark, green, blue, black } from "../config/colors";
import AppButton from "../components/AppButton";
import AuthHeader from "../components/AuthHeader";
import FalshMessage from "../components/FlashMessage";
import ScroolScreen from "../components/ScroolScreen";
import useApi from "../hooks/useApi";
import useAccount from "../hooks/useAccount";
import transactionApi from "../api/transactionApi";
import AppText from "../components/AppText";
import accountApi from "../api/accountApi";
import { useState } from "react";

const validationSchema = yup.object({
  beneficiaryAccount: yup
    .string()
    .required()
    .length(10)
    .label("account number"),
  amount: yup.number().required().min(1),
});

const Transfer = ({ navigation }) => {
  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const [message, setMessage] = useState("");
  const [accountOk, setAccountOk] = useState(false);
  const account = useAccount();
  const fundApi = useApi(transactionApi.sendFund, {});
  const { responseRef, dataRef } = fundApi;
  const sendFund = async (values, resetForm) => {
    await fundApi.request(account.account, values);
    if (responseRef.current?.ok) {
      setMessage("");
      resetForm();
      Alert.alert("transaction sucesfull", "your transaction was sucesfull", [
        {
          text: "ok",
          onPress: () => navigation.navigate("Profile"),
        },
      ]);
    }
  };
  return (
    <ScroolScreen style={styles.container}>
      <Formik
        initialValues={{ beneficiaryAccount: "", amount: "" }}
        onSubmit={(values, { resetForm }) => sendFund(values, resetForm)}
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          handleSubmit,
          errors,
          touched,
          setFieldTouched,
          setFieldValue,
          values,
        }) => {
          return (
            <>
              <AppText style={styles.balance}>
                Available balance: {format.format(account.account.balance)}
              </AppText>
              <AuthHeader
                style={styles.header}
                iconColor={green}
                text="Send Funds"
                color={black}
                icon="paper-plane"
              />

              {fundApi.isError ? (
                <FalshMessage
                  type="error"
                  message={
                    responseRef.current?.data?.message || "transacation failed"
                  }
                />
              ) : null}
              <AppText style={styles.balance}>
                ask your friend for their account number or use this account
                number: 1688928385
              </AppText>
              <AppTextInput
                clearButton="always"
                cursorColor={dark}
                value={values.beneficiaryAccount}
                inputType="text"
                onBlur={() => setFieldTouched("beneficiaryAccount")}
                placeholder="Account Number"
                iconBackgroundcolor="transparent"
                iconColor={dark}
                onChangeText={async (value) => {
                  setFieldValue("beneficiaryAccount", value);
                  const account = String(value);
                  if (value.length == 10) {
                    setMessage("");
                    const response = await accountApi.getBeneficiaryAccount(
                      account
                    );
                    if (!response.ok) {
                      setAccountOk(false);
                      setMessage("cant validate account number" + account);
                    } else {
                      setMessage(response.data.data.account_holder_name);
                      setAccountOk(true);
                    }
                  }
                }}
                style={styles.input}
                keyboardType="default"
              />
              {message ? (
                <FalshMessage
                  message={message}
                  type={accountOk ? "success" : "error"}
                />
              ) : null}
              {touched.beneficiaryAccount && (
                <FalshMessage
                  type="error"
                  message={errors.beneficiaryAccount}
                />
              )}
              <AppTextInput
                clearButton="always"
                cursorColor={dark}
                onBlur={() => setFieldTouched("amount")}
                inputType="text"
                value={values.amount}
                placeholder="Amount"
                onChangeText={handleChange("amount")}
                iconBackgroundcolor="transparent"
                iconColor={dark}
                style={styles.input}
                keyboardType="default"
              />
              {touched.amount && (
                <FalshMessage message={errors.amount} type="error" />
              )}
              {fundApi.isLodading ? (
                <View style={{ height: 200, width: "100%" }}>
                  <ActivityIndicator animate={fundApi.isLodading} />
                </View>
              ) : (
                <AppButton
                  title="Send Fund"
                  bgColor={green}
                  onPress={handleSubmit}
                  buttonAdditionalStyles={styles.button}
                />
              )}
            </>
          );
        }}
      </Formik>
    </ScroolScreen>
  );
};

export default Transfer;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 100,
    alignItems: "center",
  },
  input: {
    padding: 10,
    borderBottomColor: "transparent",
    marginVertical: 10,
    width: "100%",
    alignItems: "center",
    borderRadius: 10,
    margin: 0,
    borderColor: black,
    borderWidth: 2,
  },

  button: {
    color: blue,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  header: {
    marginBottom: 40,
  },
  balance: {
    fontWeight: "800",
    textAlign: "center",
    width: "100%",
  },
});
