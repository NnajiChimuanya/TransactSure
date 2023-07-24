import React from "react";
import { Link } from "react-router-dom";

const PaymentIdButton = () => {
  return (
    <Link to={"paymentId"}>
      <button className="paymentIdButton">Payment Ids</button>
    </Link>
  );
};

export default PaymentIdButton;
