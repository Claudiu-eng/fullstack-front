import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const InsertCategory = () => {
  let navigate = useNavigate(0);
  const [alert, setAlert] = useState(false);
  const [user, setCategory] = useState({
    name: "",
  });

  const { name } = user;
  const handleExitAlert = () => {
    setAlert(false);
  };
  const onInputChangeUser = (e) => {
    const { name, value } = e.target;

    setCategory((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8070/admin_page/insert_category", user);
    setAlert(true);
    setCategory({name:"",});
  };

  const cancel = async (e) => {
    e.preventDefault();
    navigate("/admin_page");
  };

  return (
    <div className="container">
      <>
          {alert ? (
            <div className="alert alert-secondary" role="alert">
              insert succesfully
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
          <h2 className="text-center m-4">Insert Category</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter category Name"
                name="name"
                minLength="2"
                maxLength="35"
                required
                value={name}
                onChange={(e) => onInputChangeUser(e)}
              ></input>
            </div>

            <button
              type="submit"
              id="button"
              onClick={(e) => {
                onSubmit(e);
              }}
            >
              Submit
            </button>

            <button
              type="submit"
              id="button-cancel"
              onClick={(e) => {
                cancel(e);
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InsertCategory;
