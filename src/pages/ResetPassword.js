import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const ResetPassword = () => {
  let navigate = useNavigate(0);

  const [alert, setAlert] = useState(false);

  const [user, setUser] = useState({
    confirmPassword: "",
    code: "",
    email: "",
    password: "",
  });

  const { confirmPassword, email, code, password } = user;

  const handleExitAlert = () => {
    setAlert(false);
  };
  const [errorMessage, setErrorMessage] = useState("");
  const cancel = (e) => {
    navigate("/");
  };

  const submitCode = async (e) => {
    e.preventDefault();
    try{
    const response = await axios.post(
      "http://localhost:8070/logIn/send_code/" + user.email
    );

    if (response.data) {
      console.log("trimis");
    } else {
      setAlert(true);
      setUser({
        code: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  }catch(error){
    console.log(error);
      setErrorMessage(error.response.data.message);
      setAlert(true);
  }
  };

  const onInputChangeUser = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "http://localhost:8070/logIn/reset_password",
        user
      );
      if (response.data) {
        navigate("/");
      } else {
        setAlert(true);
        setUser({
          code: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.message);
      setAlert(true);
    }
  };

  return (
    <div className="container">
      <>
        {alert ? (
          <div className="alert alert-secondary" role="alert">
            {errorMessage}
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
              onClick={handleExitAlert}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        ) : null}
      </>

      <div className="row">
        <div
          id="screen"
          className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow"
        >
          <h2 className="text-center m-4">Reset password</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Email" className="form-label">
                Email
              </label>
              <input
                type={"email"}
                className="form-control"
                placeholder="Enter your e-mail address"
                name="email"
                value={email}
                onChange={(e) => onInputChangeUser(e)}
              ></input>
              <label htmlFor="Password" className="form-label">
                Password
              </label>
              <input
                type={"password"}
                className="form-control"
                placeholder="Enter your password"
                name="password"
                value={password}
                onChange={(e) => onInputChangeUser(e)}
              ></input>
              <label htmlFor="Password" className="form-label">
                Confirm Password
              </label>
              <input
                type={"password"}
                className="form-control"
                placeholder="Enter your password again"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => onInputChangeUser(e)}
              ></input>
              <label htmlFor="Name" className="form-label">
                Code
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter Code"
                name="code"
                minLength="2"
                maxLength="35"
                required
                value={code}
                onChange={(e) => onInputChangeUser(e)}
              ></input>
            </div>

            <button
              type="submit"
              id="button"
              onClick={(e) => {
                submitCode(e);
              }}
            >
              Submit code
            </button>
            <button type="submit" id="button-reset">
              Reset
            </button>
          </form>
          <button
            type="submit"
            id="button-cancel"
            onClick={(e) => {
              cancel(e);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
