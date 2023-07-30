import React, { useState } from "react";
import ComponentHeader from "../components/componentsHeader/ComponentHeader";

const SendFunds = () => {
  const [paymentId, setPaymentId] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <div className="sendFunds">
      <ComponentHeader />
      <form className="form">
        <input
          value={paymentId}
          onChange={(e) => setPaymentId(e.target.value)}
          className="paymentId"
          type={"text"}
          placeholder="Payment Id"
        />

        <div className="password-container">
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="amount"
            placeholder="Amount"
          />
        </div>

        <button className="button">Continue</button>
      </form>
    </div>
  );
};

export default SendFunds;
