import React, { useContext, useState } from "react";
import { SkyeWalletContext } from "../context/Context";
import instance from "../Axios";
import { FaUserAlt } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { TbCurrencyNaira } from "react-icons/tb";
import { Airtime, Bills, Data, Transfer } from "../svg";
import NavBar from "../components/NavBar/NavBar";
import Balance from "../components/Balance/Balance";
import { Link } from "react-router-dom";
import PaymentIdButton from "../components/PaymentIdButton/PaymentIdButton";

const UserPage = () => {
  const { state, dispatch } = useContext(SkyeWalletContext);
  const { name, email, phoneNumber, paymentId, password, balance } = state;

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setsuccessMessage] = useState(null);

  const [list, setList] = useState([]);

  const [recipientId, setRecipientId] = useState<string | number>("");
  const [amount, setAmount] = useState<number | string>("");
  const [searchId, setSearchId] = useState<number | string>("");

  interface ISearchResult extends Document {
    email: string;
    name: string;
    phoneNumber: string;
    paymentId: string[];
  }

  const [searchResult, setSearchResult] = useState<ISearchResult | null>();

  //transfers funds
  const handleTransferFunds = (e: React.ChangeEvent<any>) => {
    e.preventDefault();

    let payload = { email, password, recipientId, amount };

    instance
      .post("/user/sendFunds", payload)
      .then((res) => {
        if (res.data.status === "success") {
          setRecipientId("");
          setAmount("");
          setErrorMessage(null);
          dispatch({ type: "SET_BALANCE", payload: res.data.balance });
          setsuccessMessage(res.data.message);
        } else {
          setErrorMessage(res.data.error);
        }
      })
      .catch((err) => console.log(err));
  };

  //search ID
  const handleSearchId = (e: React.ChangeEvent<any>) => {
    e.preventDefault();

    let payload = {
      id: searchId,
    };

    instance
      .post("/user/searchById", payload)
      .then((res) => {
        if (res.data.status === "success") {
          setSearchId("");
          setSearchResult(res.data.data);
        } else {
          setErrorMessage(res.data.error);
        }
      })
      .catch((err) => console.log(err));
  };

  //clear Search Result
  const handleClearResults = (e: React.ChangeEvent<any>) => {
    e.preventDefault();

    setSearchResult(null);
  };

  return (
    <div className="userPage">
      {errorMessage && (
        <div className="main-paragraph">
          <p style={{ color: "red" }}>{errorMessage}</p>
        </div>
      )}
      {successMessage && (
        <div className="main-paragraph">
          <p style={{ color: "green" }}>{successMessage}</p>
        </div>
      )}

      <div className="header">
        <div>
          {" "}
          <FaUserAlt /> Welcome back, {name}
        </div>
        <div>
          <IoMdNotificationsOutline className="notificationsIcon" />
        </div>
      </div>

      <Balance />

      <div className="frame2">
        <PaymentIdButton />
        <button className="viewTransactions">
          <Link className="transactionsLink" to={"/transactions"}>
            {" "}
            View transactions
          </Link>
        </button>
      </div>

      <div className="variety">
        <div className="frame3">
          <h5>What would you like to do ?</h5>
          <div className="services">
            <div
              style={{ backgroundColor: "rgba(22, 83, 1, 1)" }}
              className="airtime"
            >
              <Airtime />
              <h4>Buy airtime</h4>
            </div>
            <div
              style={{ backgroundColor: "rgba(0, 99, 153, 1)" }}
              className="transfer"
            >
              <Transfer />
              <h4>Send fund</h4>
            </div>
            <div
              style={{ backgroundColor: "rgba(12, 1, 83, 1)" }}
              className="data"
            >
              <Data />
              <h4>Buy data</h4>
            </div>
            <div
              style={{ backgroundColor: "rgba(186, 29, 200, 1)" }}
              className="bills"
            >
              <Bills />
              <h4>Pay bills</h4>
            </div>
          </div>
        </div>

        <div className="frame4">
          <div className="communitySection">
            <img
              className="communityImage"
              src="https://static.independent.co.uk/s3fs-public/thumbnails/image/2020/03/31/11/782f3606-1ca0-4f9e-9024-57a27b636ae5.jpg"
              alt="community"
            />
            <h4>Community</h4>
            <p>Discover and create savings group</p>

            <button className="discover">Discover</button>
          </div>

          <div className="businessSection">
            <img
              className="communityImage"
              src="https://s35691.pcdn.co/wp-content/uploads/2018/11/community.jpg"
              alt="community"
            />
            <h4>SKYE for business</h4>
            <p>Accept payment and manage money easily</p>

            <button className="discover">Get started</button>
          </div>
        </div>
      </div>

      <NavBar />
    </div>
  );
};

export default UserPage;
