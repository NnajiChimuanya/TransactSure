import React, { useContext, useState, useEffect } from "react";
import instance from "../Axios";
import { SkyeWalletContext } from "../context/Context";
import NavBar from "../components/NavBar/NavBar";
import Balance from "../components/Balance/Balance";
import { useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdKeyboardBackspace } from "react-icons/md";
import { NoTransaction, Credit, Debit } from "../svg";
import FundAccountButton from "../components/PaymentIdButton/PaymentIdButton";
import ComponentHeader from "../components/componentsHeader/ComponentHeader";

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
      <ComponentHeader />

      <Balance />

      <div className="transactionBody">
        {list?.length == 0 ? (
          <div className="noTransactionSection">
            <NoTransaction className="noTransactionSvg" />
            <h4>You have no transaction yet</h4>
            <p>
              Make you first transaction and we will keep the record here for
              you.
            </p>
            <FundAccountButton />
          </div>
        ) : (
          <div className="transactionList">
            {list?.map((item, key) => {
              let { amount, dateOfTransaction, _id, recieverId, senderEmail } =
                item;
              return (
                <div className="transactionItem" key={key}>
                  <div className="details">
                    {senderEmail === email ? (
                      <Debit className="debitIcon" />
                    ) : (
                      <Credit className="creditIcon" />
                    )}
                    <div className="data">
                      <h5 className="name">{recieverId}d</h5>
                      <h6>{_id}</h6>
                    </div>
                  </div>
                  <div className="date">
                    <h6
                      className={`${
                        senderEmail === email ? `debitAmount` : `creditAmount`
                      }`}
                    >
                      {amount}
                    </h6>
                    <h6>{new Date(dateOfTransaction).toLocaleString()}</h6>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <NavBar />
    </div>
  );
};

export default Transactions;
