import { StyleSheet, View } from "react-native";
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
import authApi from "../api/authApi";
import useAuth from "../hooks/useAuth";

const validationSchema = yup.object({
  email: yup.string().required().email().trim(),
  password: yup.string().required(),
});

const SignIn = () => {
  const auth = useAuth();
  const signIn = useApi(authApi.login, {});
  const { dataRef, responseRef } = signIn;
  const handleLogin = async (values) => {
    await signIn.request(values);
    if (responseRef.current.ok) {
      auth.login(signIn.dataRef.current.token, signIn.dataRef.current.data);
    }
  };
  return (
    <Screen style={styles.container}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => handleLogin(values)}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleSubmit, errors, touched, setFieldTouched }) => {
          return (
            <>
              <AuthHeader
                style={styles.header}
                iconColor={green}
                text="Sign In Your Account"
                color={black}
              />

              {signIn.isError ? (
                <FalshMessage
                  type="error"
                  message="invalid email or password"
                />
              ) : null}
              <AppTextInput
                clearButton="always"
                cursorColor={dark}
                inputType="text"
                onBlur={() => setFieldTouched("email")}
                placeholder="Email"
                iconName="email"
                iconBackgroundcolor="transparent"
                iconColor={dark}
                onChangeText={handleChange("email")}
                style={styles.input}
                keyboardType="email-address"
              />
              {touched.email && (
                <FalshMessage type="error" message={errors.email} />
              )}
              <AppTextInput
                clearButton="always"
                cursorColor={dark}
                onBlur={() => setFieldTouched("password")}
                inputType="text"
                placeholder="Password"
                iconName="lock"
                onChangeText={handleChange("password")}
                iconBackgroundcolor="transparent"
                iconColor={dark}
                secure={true}
                style={styles.input}
                keyboardType="default"
              />
              {touched.password && (
                <FalshMessage message={errors.password} type="error" />
              )}
              {signIn.isLodading ? (
                <View style={{ height: 200, width: "100%" }}>
                  <ActivityIndicator animate={signIn.isLodading} />
                </View>
              ) : (
                <AppButton
                  title="Login"
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

export default SignIn;

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
