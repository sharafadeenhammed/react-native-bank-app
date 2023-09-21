import { useContext } from "react";
import AccountContext from "../context/account";

export default () => {
  const { account, setAccount } = useContext(AccountContext);

  const setUserAccount = (data) => {
    setAccount(data);
  };

  return { account, setUserAccount };
};
