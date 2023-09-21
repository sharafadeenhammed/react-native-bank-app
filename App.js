import { AuthContextProvider } from "./context/auth";
import Naviagator from "./navigation/Naviagator";
import { AccountContextProvider } from "./context/account";

export default function App() {
  return (
    <>
      <AccountContextProvider>
        <AuthContextProvider>
          <Naviagator />
        </AuthContextProvider>
      </AccountContextProvider>
    </>
  );
}
