import React, { useContext, useState } from "react";
import { SkyeWalletContext } from "../../context/Context";
import { TbCurrencyNaira } from "react-icons/tb";

const Balance = () => {
  const { state, dispatch } = useContext(SkyeWalletContext);
  const { balance } = state;

  return (
    <div className="frame1">
      <div className="balance" style={{ flex: "0.6" }}>
        <p
          style={{
            color: "rgba(195, 209, 251, 1)",
            fontSize: "12px",
          }}
        >
          Wallet Balance
        </p>
        <div
          style={{
            display: "flex",
            letterSpacing: "0.2em",
            alignItems: "center",
            fontSize: "30px",
          }}
        >
          <TbCurrencyNaira style={{ color: "white" }} />{" "}
          <h5 style={{ color: "white" }}>{balance}</h5>
        </div>
      </div>
      <div className="image"></div>
    </div>
  );
};

export default Balance;
