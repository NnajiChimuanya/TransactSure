import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import UserPage from "./pages/UserPage";
import Transactions from "./pages/Transactions";
import PaymentIdPage from "./pages/PaymentIdPage";
import { SkyeWalletContext } from "./context/Context";
import SendFunds from "./pages/SendFunds";
import SuccessfulTransaction from "./pages/SuccessfulTransaction";
import NotificationPage from "./pages/notification/NotificationPage";

function App() {
  const { state } = useContext(SkyeWalletContext);
  const { email } = state;

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={email !== "" ? <UserPage /> : <SigninPage />}
        />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route
          path="/transactions"
          element={email !== "" ? <Transactions /> : <SigninPage />}
        />
        <Route
          path="/paymentId"
          element={email !== "" ? <PaymentIdPage /> : <SigninPage />}
        />
        <Route
          path="/sendFunds/*"
          element={email !== "" ? <SendFunds /> : <SigninPage />}
        />
        <Route path="/sendFunds/success" element={<SuccessfulTransaction />} />

        <Route path="/notifications" element={<NotificationPage />} />
      </Routes>
    </>
  );
}

export default App;
