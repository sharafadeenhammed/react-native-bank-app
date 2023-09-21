import client from "./client";

const getUserAccount = async () => {
  try {
    return client.get("/account/user");
  } catch (error) {
    console.log("get user account error: ", error);
    return { ok: false };
  }
};

const fundAcount = async (account, data) => {
  try {
    return await client.post("/account/" + account.id, data);
  } catch (error) {
    console.log("funding account error:", error);
    return { ok: false };
  }
};

const getBeneficiaryAccount = async (account) => {
  try {
    return await client.get("/account/number/" + account);
  } catch (error) {
    console.log("finding beneficiary account error:", error);
    return { ok: false };
  }
};

export default {
  getUserAccount,
  fundAcount,
  getBeneficiaryAccount,
};
