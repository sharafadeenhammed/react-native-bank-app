import { StyleSheet, View } from "react-native";
import * as yup from "yup";
import { Formik } from "formik";

import AppTextInput from "../components/AppTextInput";
import { dark, green, blue, black } from "../config/colors";
import AppButton from "../components/AppButton";
import AuthHeader from "../components/AuthHeader";
import FalshMessage from "../components/FlashMessage";
import ScroolScreen from "../components/ScroolScreen";
import useApi from "../hooks/useApi";
import authApi from "../api/authApi";
import useAuth from "../hooks/useAuth";
import ActivityIndicator from "../components/animations/ActivityIndicator";

const validationSchema = yup.object({
  email: yup.string().required().email().trim(),
  password: yup.string().required().min(8),
  first_name: yup.string().required().min(2).label("first name"),
  last_name: yup.string().required().min(2).label("last name"),
  address: yup.string().required().min(3),
  age: yup.number().required().min(18),
  phone: yup.string().required().label("phone"),
});

const Register = () => {
  const auth = useAuth();
  const signUp = useApi(authApi.signUp, {});
  const { dataRef, responseRef } = signUp;
  const handleSignUp = async (values) => {
    await signUp.request(values);
    if (responseRef.current.ok)
      auth.login(signUp.dataRef.current.token, signUp.dataRef.current.data);
  };
  return (
    <ScroolScreen style={styles.container}>
      <Formik
        initialValues={{
          email: "",
          password: "",
          first_name: "",
          last_name: "",
          address: "",
          age: "",
          phone: "",
        }}
        onSubmit={(values) => handleSignUp(values)}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleSubmit, errors, touched, setFieldTouched }) => {
          return (
            <>
              <AuthHeader
                style={styles.header}
                iconColor={green}
                text="Sign Up For A New Account"
                color={black}
              />

              <AppTextInput
                clearButton="always"
                cursorColor={dark}
                inputType="text"
                onBlur={() => setFieldTouched("first_name")}
                placeholder="First name"
                iconName="account-box"
                iconBackgroundcolor="transparent"
                iconColor={dark}
                onChangeText={handleChange("first_name")}
                style={styles.input}
                keyboardType="default"
              />
              {touched.first_name && (
                <FalshMessage type="error" message={errors.first_name} />
              )}
              <AppTextInput
                clearButton="always"
                cursorColor={dark}
                inputType="text"
                onBlur={() => setFieldTouched("last_name")}
                placeholder="Last name"
                iconName="account-box"
                iconBackgroundcolor="transparent"
                iconColor={dark}
                onChangeText={handleChange("last_name")}
                style={styles.input}
                keyboardType="default"
              />
              {touched.last_name && (
                <FalshMessage type="error" message={errors.last_name} />
              )}
              <AppTextInput
                clearButton="always"
                cursorColor={dark}
                inputType="text"
                onBlur={() => setFieldTouched("address")}
                placeholder="address"
                iconName="account-box"
                iconBackgroundcolor="transparent"
                iconColor={dark}
                onChangeText={handleChange("address")}
                style={styles.input}
                keyboardType="default"
              />
              {touched.address && (
                <FalshMessage type="error" message={errors.address} />
              )}
              <AppTextInput
                clearButton="always"
                cursorColor={dark}
                inputType="text"
                onBlur={() => setFieldTouched("age")}
                placeholder="age"
                iconName="account-box"
                iconBackgroundcolor="transparent"
                iconColor={dark}
                onChangeText={handleChange("age")}
                style={styles.input}
                keyboardType="numeric"
              />
              {touched.age && (
                <FalshMessage type="error" message={errors.age} />
              )}
              <AppTextInput
                clearButton="always"
                cursorColor={dark}
                inputType="text"
                onBlur={() => setFieldTouched("phone")}
                placeholder="Phone Number"
                iconName="account-box"
                iconBackgroundcolor="transparent"
                iconColor={dark}
                onChangeText={handleChange("phone")}
                style={styles.input}
                keyboardType="phone-pad"
              />
              {touched.phone && (
                <FalshMessage type="error" message={errors.phone} />
              )}
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
              {signUp.isError ? (
                <FalshMessage type="error" message={signUp.data.message} />
              ) : null}
              {signUp.isLodading ? (
                <View style={{ height: 150 }}>
                  <ActivityIndicator animate={signUp.isLodading} />
                </View>
              ) : (
                <AppButton
                  title="Sign Up"
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

export default Register;

const styles = StyleSheet.create({
  container: {
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
    // marginHorizontal: 10,
    width: "100%",
    height: "100%",
  },
  input: {
    padding: 2,
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
    marginBottom: 20,
    marginTop: 50,
  },
});
