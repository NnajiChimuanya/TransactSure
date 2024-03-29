import React, { useState, useContext } from "react";
import ComponentHeader from "../components/componentsHeader/ComponentHeader";
import instance from "../Axios";
import { SkyeWalletContext } from "../context/Context";
import Modal from "../components/Modal/Modal";
import { useNavigate } from "react-router-dom";

const SendFunds = () => {
  const [recipientId, setRecipientId] = useState("");
  const [amount, setAmount] = useState("");
  const [password, setPassword] = useState("");
  const { state, dispatch } = useContext(SkyeWalletContext);
  const { balance, email } = state;
  const navigate = useNavigate();

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
        if (res.data.status === "error") {
          dispatch({ type: "SET_MODAL_MESSAGE", payload: res.data.error });
          dispatch({ type: "SET_MODAL", payload: true });
        } else {
          navigate("/sendFunds/success");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="sendFunds">
      <ComponentHeader />

      <Modal />
      <form className="form" autoComplete="off">
        <input
          value={recipientId}
          onChange={(e) => setRecipientId(e.target.value)}
          className="paymentId"
          type={"text"}
          placeholder="Payment Id"
          autoComplete="off"
        />

        <div className="amount-container">
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="amount"
            placeholder="Amount"
            autoComplete="off"
          />
        </div>

        <div className="password-container">
          <div>Enter your transaction pin</div>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="password"
            placeholder=""
            type="password"
            autoComplete="new-password"
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
