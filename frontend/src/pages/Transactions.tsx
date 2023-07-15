import React, { useContext, useState, useEffect } from "react";
import instance from "../Axios";
import { SkyeWalletContext } from "../context/Context";
import NavBar from "../components/NavBar/NavBar";
import Balance from "../components/Balance/Balance";
import { useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdKeyboardBackspace } from "react-icons/md";
import { NoTransaction } from "../svg";
import FundAccountButton from "../components/FundAccountButton/FundAccountButton";

const Transactions: React.FC = () => {
  let navigate = useNavigate();

  const { state, dispatch } = useContext(SkyeWalletContext);
  const { name, email, phoneNumber, paymentId, password, balance } = state;

  const [list, setList] = useState([]);
  //get transactions

  const getTransactions = () => {
    let payload = { email, password };

    instance
      .post("/user/getTransactions", payload)
      .then((res) => {
        setList(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    return () => {
      getTransactions();
    };
  }, []);

  return (
    <div className="transactionsPage">
      <div className="transactionsHeader">
        <MdKeyboardBackspace
          className="backspace"
          onClick={() => navigate(-1)}
        />

        <IoMdNotificationsOutline className="notificationsIcon" />
      </div>

      <Balance />

      <div className="transactionBody">
        <div className="noTransactionSection">
          <NoTransaction className="noTransactionSvg" />
          <h4>You have no transaction yet</h4>
          <p>
            Make you first transaction and we will keep the record here for you.
          </p>
          <FundAccountButton />
        </div>
      </div>

      <NavBar />
    </div>
  );
};

export default Transactions;
