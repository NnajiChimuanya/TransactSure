import React, { useState, useContext } from "react";
import ComponentHeader from "../components/componentsHeader/ComponentHeader";
import instance from "../Axios";
import { SkyeWalletContext } from "../context/Context";

const SendFunds = () => {
  const [recipientId, setRecipientId] = useState("");
  const [amount, setAmount] = useState("");
  const { state, dispatch } = useContext(SkyeWalletContext);
  const { balance, password, email } = state;

  const handleSendFunds = (e: React.ChangeEvent<any>) => {
    e.preventDefault();

    let payload = {
      email,
      password,
      recipientId,
      amount,
    };

    instance
      .post("user/sendFunds", payload)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="sendFunds">
      <ComponentHeader />
      <form className="form">
        <input
          value={recipientId}
          onChange={(e) => setRecipientId(e.target.value)}
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

        <button onClick={handleSendFunds} className="button">
          Continue
        </button>
      </form>
    </div>
  );
};

export default SendFunds;
