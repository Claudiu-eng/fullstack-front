import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const InsertEmployee = () => {
  let navigate = useNavigate(0);

  const [alert, setAlert] = useState(false);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    numberOfTelephone: "",
    email: "",
    password: "",
    wage: "",
  });

  const [errorMessage,setErrorMessage]=useState("");
  const { firstName, email, lastName, numberOfTelephone, password, wage } =
    user;

  const handleExitAlert = () => {
    setAlert(false);
  };

  const cancel = () => {
    navigate("/admin_page");
  };

  const onInputChangeUser = (e) => {
    const { name, value } = e.target;

    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try{
    const response = await axios.post(
      "http://localhost:8070/admin_page/insert_employee",
      user
    );
    if (response.data) navigate("/admin_page");
    else {
      setAlert(true);
      setUser({
        firstName: "",
        lastName: "",
        numberOfTelephone: "",
        email: "",
        password: "",
        wage: "",
      });
    }
    }catch(error){
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
          <h2 className="text-center m-4">Register User</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                First Name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter First Name"
                name="firstName"
                minLength="2"
                maxLength="35"
                required
                value={firstName}
                onChange={(e) => onInputChangeUser(e)}
              ></input>
              <label htmlFor="Name" className="form-label">
                Last Name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter Last Name"
                name="lastName"
                minLength="2"
                maxLength="35"
                required
                value={lastName}
                onChange={(e) => onInputChangeUser(e)}
              ></input>
              <label htmlFor="Email" className="form-label">
                Email
              </label>
              <input
                // type={"email"}
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

              <label htmlFor="Name" className="form-label">
                Wage
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter wage"
                name="wage"
                value={wage}
                onChange={(e) => onInputChangeUser(e)}
              ></input>

              <label htmlFor="Name" className="form-label">
                Number of telephone
              </label>
              <input
                type={"text"}
                // minLength="10"
                // maxLength="10"
                // pattern="0\d+$"
                title="Must contain only digits"
                required
                className="form-control"
                placeholder="Enter number of telephone"
                name="numberOfTelephone"
                value={numberOfTelephone}
                onChange={(e) => onInputChangeUser(e)}
              ></input>
            </div>
            <button type="submit" id="button">
              Submit
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

export default InsertEmployee;
