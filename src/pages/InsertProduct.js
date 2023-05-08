import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const InsertProduct = () => {
  let navigate = useNavigate(0);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: {
      id: "",
      name: "",
    },
  });

  const [alert, setAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { name, price, stock, description } = product;

  const handleExitAlert = () => {
    setAlert(false);
  };
  const cancel = (e) => {
    e.preventDefault();
    navigate("/employee_page");
  };

  const onInputChangeProduct = (e) => {
    const { name, value } = e.target;

    if (name === "category") {
      setProduct((prevProduct) => ({
        ...prevProduct,
        category: { ...prevProduct.category, id: value },
      }));
    } else {
      setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
    }
  };

  const [categories, setCategories] = useState([]);

  const loadCategories = async () => {
    const result = await axios.get(
      "http://localhost:8070/employee_page/categories"
    );
    setCategories(result.data);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:8070/product_page/insert_product",
        product
      );
      loadCategories();
      setProduct({
        name: "",
        price: "",
        description: "",
        stock: "",
        category: {
          id: "",
          name: "",
        },
      });
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.message);
      setAlert(true);
    }
  };

  return (
    <>
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
            <h2 className="text-center m-4">Insert Product</h2>
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="mb-3">
                <label htmlFor="Name" className="form-label">
                  Name
                </label>
                <input
                  type={"text"}
                  className="form-control"
                  placeholder="Enter  Name"
                  name="name"
                  minLength="2"
                  maxLength="35"
                  required
                  value={name}
                  onChange={(e) => onInputChangeProduct(e)}
                ></input>
                <label htmlFor="Name" className="form-label">
                  Short description
                </label>
                <input
                  type={"text"}
                  className="form-control"
                  placeholder="Enter a short description"
                  name="description"
                  value={description}
                  onChange={(e) => onInputChangeProduct(e)}
                ></input>

                <label htmlFor="Name" className="form-label">
                  Stock
                </label>
                <input
                  type={"text"}
                  className="form-control"
                  placeholder="Enter stock"
                  name="stock"
                  // pattern="\d+$"
                  title="Must contain only digits"
                  value={stock}
                  onChange={(e) => onInputChangeProduct(e)}
                ></input>

                <label htmlFor="Name" className="form-label">
                  Price
                </label>
                <input
                  type={"text"}
                  // pattern="\d+$"
                  title="Must contain only digits"
                  required
                  className="form-control"
                  placeholder="Enter price"
                  name="price"
                  value={price}
                  onChange={(e) => onInputChangeProduct(e)}
                ></input>

                <select
                  className="form-select"
                  name="category"
                  // required
                  onChange={(e) => onInputChangeProduct(e)}
                >
                  {categories.map((categ) => (
                    <option key={categ.id} value={categ.id}>
                      {categ.name}
                    </option>
                  ))}
                </select>
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
    </>
  );
};

export default InsertProduct;
