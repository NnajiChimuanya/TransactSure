import React, { useContext, useState } from "react";
import ComponentHeader from "../components/componentsHeader/ComponentHeader";
import NavBar from "../components/NavBar/NavBar";
import { SkyeWalletContext } from "../context/Context";
import instance from "../Axios";

const PaymentIdPage = () => {
  const { state, dispatch } = useContext(SkyeWalletContext);
  const { paymentId, email, password } = state;
  console.log(paymentId);

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setsuccessMessage] = useState(null);

  //generates new Id
  const handleGeneratePaymentId = (e: React.ChangeEvent<any>) => {
    e.preventDefault();

    let payload = {
      email,
      password,
    };

    instance
      .post("/user/generateNewId", payload)
      .then((res) => {
        if (res.data.status === "success") {
          setErrorMessage(null);
          dispatch({ type: "SET_PAYMENTID", payload: res.data.paymentId });
        } else {
          setErrorMessage(res.data.error);
        }
      })
      .catch((err) => console.log(err));
  };

  //delete an id
  const handleDeleteId = (id: string) => {
    let payload = { email, password, id };

    instance
      .post("/user/deleteId", payload)
      .then((res) => {
        if (res.data.status === "success") {
          setErrorMessage(null);
          dispatch({ type: "SET_PAYMENTID", payload: res.data.paymentId });
        } else {
          setErrorMessage(res.data.error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="paymentIdPage">
      <ComponentHeader />

      {errorMessage && (
        <div className="main-paragraph">
          <p style={{ color: "red" }}>{errorMessage}</p>
        </div>
      )}

      {/* <div>
        payment
        <button
          onClick={() => {
            navigator.clipboard.writeText("Nnaji Chimuanya");
          }}
        >
          copy to clipboard
        </button>
      </div> */}

      {paymentId?.map((item, id) => {
        return (
          <div className="item" key={id}>
            <h4>{item}</h4>
          </div>
        );
      })}

      <NavBar />
    </div>
  );
};

export default PaymentIdPage;
