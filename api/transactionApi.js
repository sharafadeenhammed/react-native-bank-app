import client from "./client";

const getTransactions = async (account) => {
  try {
    return await client.get("/transaction/account/" + account.id);
  } catch (error) {
    console.log("fetching account transaction failed: ", error);
    return { ok: false };
  }
};

const sendFund = async (account, data) => {
  try {
    return client.post("/transaction/account/" + account.id, data);
  } catch (error) {
    console.log("fund sending error:  ", error);
  }
};

export default {
  getTransactions,
  sendFund,
};
