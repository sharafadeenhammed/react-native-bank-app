import { Alert, StyleSheet, View } from "react-native";
import * as yup from "yup";
import { Formik } from "formik";
import ActivityIndicator from "../components/animations/ActivityIndicator";

import AppTextInput from "../components/AppTextInput";
import { dark, green, blue, black } from "../config/colors";
import AppButton from "../components/AppButton";
import AuthHeader from "../components/AuthHeader";
import FalshMessage from "../components/FlashMessage";
import Screen from "../components/Screen";
import useApi from "../hooks/useApi";
import useAccount from "../hooks/useAccount";
import AccountApi from "../api/accountApi";

const validationSchema = yup.object({
  amount: yup.number().required().min(1),
});

const Fund = ({ navigation }) => {
  const account = useAccount();
  const accountApiInterfce = useApi(AccountApi.fundAcount);

  const fund = async (values, resetForm) => {
    await accountApiInterfce.request(account.account, values);
    if (!accountApiInterfce.isLodading && !accountApiInterfce.isError) {
      const altAccount = account.account;
      altAccount.balance =
        parseFloat(altAccount.balance) + parseFloat(values.amount);
      account.setUserAccount(altAccount);
      resetForm();
      Alert.alert(
        "transaction sucesfull",
        "you sucesfull funded your account with $" + values.amount,
        [
          {
            text: "ok",
            onPress: () => navigation.navigate("Profile"),
          },
        ]
      );
    }
  };
  return (
    <Screen style={styles.container}>
      <Formik
        initialValues={{ amount: "" }}
        onSubmit={(values, { resetForm }) => fund(values, resetForm)}
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          handleSubmit,
          errors,
          touched,
          setFieldTouched,
          values,
        }) => {
          return (
            <>
              <AuthHeader
                style={styles.header}
                iconColor={green}
                text="Fund Your Account"
                color={black}
                icon="dollar-sign"
              />

              {accountApiInterfce.isError ? (
                <FalshMessage
                  type="error"
                  message="Failed to fund your account"
                />
              ) : null}
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
                keyboardType="numeric"
              />
              {touched.amount && (
                <FalshMessage message={errors.amount} type="error" />
              )}
              {accountApiInterfce.isLodading ? (
                <View style={{ height: 200, width: "100%" }}>
                  <ActivityIndicator animate={accountApiInterfce.isLodading} />
                </View>
              ) : (
                <AppButton
                  title="Fund Your Account"
                  bgColor={green}
                  onPress={handleSubmit}
                  buttonAdditionalStyles={styles.button}
                />
              )}
            </>
          );
        }}
      </Formik>
    </Screen>
  );
};

export default Fund;

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
});
