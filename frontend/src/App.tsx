import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import UserPage from "./pages/UserPage";
import Transactions from "./pages/Transactions";
import { SkyeWalletContext } from "./context/Context";

function App() {
  const { state } = useContext(SkyeWalletContext);
  const { email } = state;

  return (
    <Routes>
      <Route path="/" element={email !== "" ? <UserPage /> : <SigninPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/transactions" element={<Transactions />} />
    </Routes>
  );
}

export default App;
