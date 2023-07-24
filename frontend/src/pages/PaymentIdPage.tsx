import React, { useContext, useState } from "react";
import ComponentHeader from "../components/componentsHeader/ComponentHeader";
import NavBar from "../components/NavBar/NavBar";
import { SkyeWalletContext } from "../context/Context";
import instance from "../Axios";
import { GoCopy } from "react-icons/go";
import { AiFillDelete } from "react-icons/ai";

const PaymentIdPage = () => {
  const { state, dispatch } = useContext(SkyeWalletContext);
  const { paymentId, email, password } = state;
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setsuccessMessage] = useState(null);

  console.log(process.env.REACT_APP_API);

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
        <div className="errorMessageContainer">
          <div className="errorMessage">
            <p>{errorMessage}</p>
          </div>
        </div>
      )}

      <div className="paymentIdList">
        {paymentId?.map((item, id) => {
          return (
            <div className="paymentIdItem" key={id}>
              <h4>{item}</h4>
              <div className="iconContainer">
                <GoCopy
                  className="copyIcon"
                  onClick={() => {
                    navigator.clipboard.writeText(item);
                    alert("Item copied");
                  }}
                />
                <AiFillDelete
                  className="deleteIcon"
                  onClick={() => handleDeleteId(item)}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="generatePaymentIdContainer">
        <button
          className="generatePaymentIdButton"
          onClick={handleGeneratePaymentId}
        >
          Generate payment Id
        </button>
      </div>

      <NavBar />
    </div>
  );
};

export default PaymentIdPage;
