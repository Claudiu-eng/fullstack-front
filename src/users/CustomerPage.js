import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CustomerPage.css";
import { saveAs } from "file-saver";

const CustomerPage = () => {
  const [seeProducts, setSeeProducts] = useState(false);
  const [seeShoppingCart, setSeeShoppingCart] = useState(false);
  let navigate = useNavigate(0);

  const [seeOrders, setSeeOrders] = useState(false);
  const [seePersonalReviews, setSeePersonalReviews] = useState(false);
  const [seeReviewProduct, setSeeReviewProduct] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartQuantity, setCartQuantity] = useState([]);
  const [orders, setOrders] = useState([]);
  const [number, setNumber] = useState("");
  const [text, setText] = useState("");
  const [reviews, setReviews] = useState([]);
  const [reviews2, setReviews2] = useState([]);
  const [personalReviewsProducts, setPersonalReviewsProducts] = useState([]);
  const [xmlButton, setXMLButton] = useState(false);

  const [review, setReview] = useState({
    numberOfStars: "",
    message: "",
  });

  const [nameOrDescription, setNameOrDescription] = useState("");
  const [categories, setCategories] = useState([]);

  function handleTextChange(event) {
    setText(event.target.value);
  }

  const loadCategories = async () => {
    const result = await axios.get(
      "http://localhost:8070/employee_page/categories"
    );
    setCategories(result.data);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const [userConnected, setUserConected] = useState({
    id: 0,
    firstName: "",
    lastName: "",
    email: "nu",
    password: "",
    userType: "guest",
  });

  const onInputChangeReview = (e) => {
    const { name, value } = e.target;

    setNumber(value);
  };

  const onInputChangeSearch = (e) => {
    const { name, value } = e.target;

    setNameOrDescription(value);
  };

  const lasaReview = async (product) => {
    review.message = text;
    review.numberOfStars = number;

    const result = await axios.post(
      "http://localhost:8070/client_page/lasa_review/" +
        product.id +
        "/" +
        userConnected.email,
      review
    );

    setText("");
    setNumber("");
  };

  const loadShoppingCart = async () => {
    const result = await axios.post(
      "http://localhost:8070/client_page/see_shopping_cart_products/" +
        userConnected.email
    );
    setCartQuantity(result.data.quantities);
    setProducts(result.data.products);
  };

  const veziReview = async (product) => {
    setSeeShoppingCart(false);
    setSeeReviewProduct(true);
    setSeeOrders(false);
    setSeeProducts(false);
    setSeePersonalReviews(false);

    const result = await axios.post(
      "http://localhost:8070/client_page/see_reviews/" + product.id
    );
    setReviews(result.data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const loadUser = () => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUserConected(foundUser);
      console.log(foundUser);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const loadOrders = async () => {
    const result = await axios.post(
      "http://localhost:8070/client_page/see_orders/" + userConnected.email
    );
    setOrders(result.data);
  };

  const loadProducts = async () => {
    const result = await axios.get(
      "http://localhost:8070/product_page/see_products"
    );
    setProducts(result.data);
  };

  const loadProductsFiltered = async () => {
    const data = {
      prices: selectedPrices,
      categories: selectedBrands,
    };

    setXMLButton(true);

    const result = await axios.post(
      "http://localhost:8070/product_page/filter_products",
      data
    );
    setProducts(result.data);
  };

  const loadProductsSearched = async () => {
    const payload = {
      keyWord: nameOrDescription,
    };

    const result = await axios.post(
      "http://localhost:8070/product_page/search_products_after_name_or_description",
      payload
    );
    setProducts(result.data);
  };

  const loadPersonalReviews = async () => {
    const result = await axios.post(
      "http://localhost:8070/client_page/see_personal_review/" +
        userConnected.email
    );

    if (result.data !== null) {
      setReviews2(result.data.reviews);
      setPersonalReviewsProducts(result.data.products);
    }
  };

  const logOut = (e) => {
    const result = axios.post(
      "http://localhost:8070/logIn/logOut/" + userConnected.email
    );
    setUserConected({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      userRole: "guest",
    });
    localStorage.clear();
    navigate("/");
  };

  const addToShopCart = async (product) => {
    axios.post(
      "http://localhost:8070/client_page/buy_product/" + userConnected.email,
      product
    );
  };

  const deleteProduct = async (item) => {
    await axios.post(
      "http://localhost:8070/client_page/delete_product/" + userConnected.email,
      item
    );
    loadShoppingCart();
  };

  const deletePersonalReview = async (product, review) => {
    await axios.delete(
      "http://localhost:8070/client_page/delete_personal_review/" +
        userConnected.email +
        "/" +
        product.id +
        "/" +
        review.id
    );
    loadPersonalReviews();
  };

  const manageProducts = (e) => {
    setSeeProducts(true);
    setSeeShoppingCart(false);
    setSeeOrders(false);
    setSeeReviewProduct(false);
    setSeePersonalReviews(false);
    setXMLButton(false);
    loadProducts();
  };

  const manageShoppingCart = (e) => {
    setSeeShoppingCart(true);
    setXMLButton(false);
    setSeeReviewProduct(false);
    setSeeOrders(false);
    setSeeProducts(false);
    setSeePersonalReviews(false);
    loadShoppingCart();
  };

  const manageOrders = (e) => {
    setSeeShoppingCart(false);
    setXMLButton(false);
    setSeePersonalReviews(false);
    setSeeReviewProduct(false);
    setSeeProducts(false);
    setSeeOrders(true);
    loadOrders();
  };

  const manageReviews = (e) => {
    setSeeShoppingCart(false);
    setSeeReviewProduct(false);
    setSeeProducts(false);
    setSeeOrders(false);
    setXMLButton(false);
    setSeePersonalReviews(true);
    loadPersonalReviews();
  };

  const filterProducts = (e) => {
    setSeeProducts(true);
    setSeeShoppingCart(false);
    setSeeOrders(false);
    setXMLButton(false);
    setSeeReviewProduct(false);
    setSeePersonalReviews(false);
    loadProductsFiltered();
  };

  const searchProducts = (e) => {
    setSeeProducts(true);
    setSeeShoppingCart(false);
    setSeeOrders(false);
    setSeeReviewProduct(false);
    setSeePersonalReviews(false);
    setXMLButton(false);
    loadProductsSearched();
  };

  const placeOrder = () => {
    navigate("/customer_page/pay");
  };

  const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const handlePriceCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedPrices((prevSelectedPrices) => [...prevSelectedPrices, value]);
    } else {
      setSelectedPrices((prevSelectedPrices) =>
        prevSelectedPrices.filter((price) => price !== value)
      );
    }
  };

  const handleCategoryCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedBrands((prevSelectedBrands) => [...prevSelectedBrands, value]);
    } else {
      setSelectedBrands((prevSelectedBrands) =>
        prevSelectedBrands.filter((brand) => brand !== value)
      );
    }
  };

  const generateXML = async (e) => {
    const response =await axios.post(
      "http://localhost:8070/client_page/generate_xml" ,
      products
    );

    let typeForBlob = "text/xml;charset=utf-8";
    let blob = new Blob([response.data], { type: typeForBlob });
    saveAs(blob, "owner-data.xml");
    setXMLButton(false);
  };

  return (
    <div>
      <div id="white1">
        <header role="banner">
          <h1>Welcome</h1>
          <ul className="utilities">
            <br />
            <li className="logout warn"></li>
          </ul>
        </header>

        <div>
          <nav role="navigation">
            <ul className="main">
              <li className="write">
                <a onClick={(e) => manageOrders(e)}>See orders</a>
              </li>
              <li className="users">
                <a
                  onClick={(e) => {
                    manageProducts(e);
                  }}
                >
                  See Products
                </a>
              </li>
              <li className="users">
                <a onClick={(e) => manageShoppingCart(e)}>See ShoppingCart</a>
              </li>
              <li className="users">
                <a onClick={(e) => manageReviews(e)}>Manage Reviews</a>
              </li>
              <li className="users">
                <a
                  onClick={(e) => {
                    searchProducts(e);
                  }}
                >
                  Search
                </a>
              </li>
              <li className="users">
                <a
                  onClick={(e) => {
                    filterProducts(e);
                  }}
                >
                  Filter
                </a>
              </li>
              {xmlButton ? (
                <li className="write">
                  <a
                    onClick={(e) => {
                      generateXML(e);
                    }}
                  >
                    See XML
                  </a>
                </li>
              ) : null}
              <li className="logout warn">
                <a onClick={(e) => logOut(e)}>Log Out</a>
              </li>
            </ul>

            {seeProducts ? (
              <div className="checkbox-container-wrapper">
                <h4>Prices</h4>
                <div className="checkbox-container">
                  <input
                    className="checkbox-input"
                    type="checkbox"
                    value="0-100"
                    onChange={handlePriceCheckboxChange}
                  />
                  <label className="checkbox-label">0-100</label>
                </div>
                <div className="checkbox-container">
                  <input
                    className="checkbox-input"
                    type="checkbox"
                    value="100-500"
                    onChange={handlePriceCheckboxChange}
                  />
                  <label className="checkbox-label">100-500</label>
                </div>
                <div className="checkbox-container">
                  <input
                    className="checkbox-input"
                    type="checkbox"
                    value="500+"
                    onChange={handlePriceCheckboxChange}
                  />
                  <label className="checkbox-label">500+</label>
                </div>
              </div>
            ) : null}

            {seeProducts ? (
              <div className="checkbox-container-wrapper">
                <h4>Categories</h4>
                {categories.map((categ) => (
                  <div className="checkbox-container" key={categ.id}>
                    <input
                      className="checkbox-input"
                      type="checkbox"
                      value={categ.id}
                      onChange={handleCategoryCheckboxChange}
                    />
                    <label className="checkbox-label">{categ.name}</label>
                  </div>
                ))}
              </div>
            ) : null}
          </nav>

          {seeProducts ? (
            <div>
              <main role="main">
                <section className="panel important">
                  <h1>The best customer ever!!</h1>
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Review</th>
                        <th>Stock</th>
                        <th>Category</th>
                        <th>Price</th>
                      </tr>
                    </thead>

                    <tbody>
                      {products.map((product, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{product.name}</td>
                          <td>{product.description}</td>
                          <td>{product.stock}</td>
                          <td>{product.category.name}</td>
                          <td>{product.price}</td>
                          <td>
                            <button
                              className="btn btn-outline-primary mx-2"
                              onClick={() => addToShopCart(product)}
                            >
                              Add to Shopping cart
                            </button>
                            <button
                              className="btn btn-danger mx-2"
                              onClick={() => lasaReview(product)}
                            >
                              Lasa review
                            </button>

                            <button
                              className="btn btn-success"
                              onClick={() => veziReview(product)}
                            >
                              Vezi review
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>
              </main>
              <div>
                <label htmlFor="Name" className="form-label">
                  Name or description
                </label>
                <input
                  type={"text"}
                  minLength="1"
                  maxLength="100"
                  required
                  placeholder="Enter name or description"
                  value={nameOrDescription}
                  name="nameOrDescription"
                  onChange={onInputChangeSearch}
                ></input>
              </div>
              <div>
                <label htmlFor="Name" className="form-label">
                  No of Stars
                </label>
                <input
                  type={"text"}
                  pattern="\d+$"
                  title="Must contain only one digit"
                  minLength="1"
                  maxLength="1"
                  required
                  placeholder="Enter noOfStars"
                  value={number}
                  name="stars"
                  onChange={onInputChangeReview}
                ></input>
              </div>
              <textarea
                value={text}
                onChange={handleTextChange}
                rows="4"
                cols="50"
              />
            </div>
          ) : null}

          {seeShoppingCart ? (
            <div>
              <main role="main">
                <section className="panel important">
                  <h1>The best customer ever!!</h1>
                  <table>
                    <thead>
                      <tr>
                        <th>IDX</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{product.name}</td>
                          <td>{product.description}</td>
                          <td>{product.price}</td>
                          <td>{product.category.name}</td>
                          <td>{cartQuantity.at(index)}</td>
                          <td>
                            <button
                              className="btn btn-danger mx-2"
                              onClick={() => deleteProduct(product, index)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button
                    className="btn btn-primary mx-2"
                    onClick={() => placeOrder()}
                  >
                    Place Order
                  </button>
                </section>
              </main>
            </div>
          ) : null}

          {seeOrders ? (
            <div>
              <main role="main">
                <section className="panel important">
                  <h1>The best customer ever!!</h1>
                  <table>
                    <thead>
                      <tr>
                        <th>IDX</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((product, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{product.message}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>
              </main>
            </div>
          ) : null}

          {seeReviewProduct ? (
            <div>
              <main role="main">
                <section className="panel important">
                  <h1>The best customer ever!!</h1>
                  <table>
                    <thead>
                      <tr>
                        <th>IDX</th>
                        <th>Review</th>
                        <th>Stars</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reviews.map((review, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{review.message}</td>
                          <td>{review.numberOfStars}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>
              </main>
            </div>
          ) : null}

          {seePersonalReviews ? (
            <div>
              <main role="main">
                <section className="panel important">
                  <h1>The best customer ever!!</h1>
                  <table>
                    <thead>
                      <tr>
                        <th>IDX</th>
                        <th>Name</th>

                        <th>Price</th>
                        <th>Comment</th>
                        <th>Stars/9</th>
                      </tr>
                    </thead>
                    <tbody>
                      {personalReviewsProducts.map((product, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{product.name}</td>
                          <td>{product.price}</td>
                          <td>{reviews2.at(index).message}</td>
                          <td>{reviews2.at(index).numberOfStars}</td>
                          <td>
                            <button
                              className="btn btn-danger mx-2"
                              onClick={() =>
                                deletePersonalReview(
                                  product,
                                  reviews2.at(index)
                                )
                              }
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>
              </main>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CustomerPage;
