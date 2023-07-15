import React, { useState, useContext } from "react";
import { SkyeWalletContext } from "../context/Context";
import { Link, useNavigate } from "react-router-dom";
import instance from "../Axios";

const SignupPage = () => {
  const { dispatch } = useContext(SkyeWalletContext);
  const [name, setName] = useState<string | number>("");
  const [email, setEmail] = useState<string | number>("");
  const [password, setPassword] = useState<string | number>("");
  const [phoneNumber, setphoneNumber] = useState<string | number>("");
  const [showPassword, setShowPassword] =
    useState<React.SetStateAction<boolean>>(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  //toggle password
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  //handle sign up function
  const handleSignup = (e: React.ChangeEvent<any>) => {
    e.preventDefault();

    let data = {
      name,
      email,
      password,
      phoneNumber,
    };

    instance
      .post("/auth/signup", data)
      .then((res) => {
        if (!res.data.error) {
          dispatch({ type: "SET_LOGIN", payload: res.data });
          navigate("/");
        } else {
          setErrorMessage(res.data.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="signup">
      <h2> Sign up</h2>
      {errorMessage && (
        <div className="main-paragraph">
          <p style={{ color: "red" }}>{errorMessage}</p>
        </div>
      )}
      <div className="form-container">
        <form className="form">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-field"
            type={"text"}
            placeholder="Name"
          />

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-field"
            type={"text"}
            placeholder="Email"
          />

          <input
            value={phoneNumber}
            onChange={(e) => setphoneNumber(e.target.value)}
            className="form-field"
            type={"text"}
            placeholder="phone number"
          />

          <div className="password-container">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              className="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
            />
            <div className="toggle" onClick={togglePassword}>
              SHOW
            </div>
          </div>

          <p>
            Have an account already?
            <Link className="link" to="/">
              Sign in
            </Link>
          </p>

          <button onClick={handleSignup} className="button">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
