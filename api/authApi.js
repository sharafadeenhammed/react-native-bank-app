import client from "./client";

const login = async (data) => {
  try {
    return await client.post("/auth/login", data);
  } catch (error) {
    console.log("user login request error: ", error);
    return { ok: false };
  }
};

const signUp = async (data) => {
  try {
    return await client.post("/auth/register", data);
  } catch (error) {
    console.log("user registration request error: ", error);
  }
};

export default {
  login,
  signUp,
};
