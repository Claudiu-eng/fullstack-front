import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Register from "./pages/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPage from "./users/AdminPage";
import LogIn from "./pages/LogIn";
import CustomerPage from "./users/CustomerPage";
import EmployeePage from "./users/EmployeePage";
import InsertCategory from "./pages/InsertCategory";
import InsertEmployee from "./pages/InsertEmployee";
import InsertProduct from "./pages/InsertProduct";
import Payment from "./pages/Payment";
import ResetPassword from "./pages/ResetPassword";


function App() {
  return (
    <div className="App">
      <Router>
        {/* <Navbar /> */}

        {/* <Routes>
           <Route exact path="/" element={<Home />} />
           <Route exact path="/addUser" element={<AdminPage />} />
          <Route exact path="/" element={<LogIn />} />
          <Route exact path="/customer_page" element={<CustomerPage />} />

          </Routes> */}
        
          <Routes>
            <Route exact path="/" element={<LogIn />} />
            <Route exact path="/customer_page" element={<CustomerPage />} />
            <Route exact path="/employee_page" element={<EmployeePage />} />
            <Route exact path="/admin_page" element={<AdminPage />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/employee/insert_product" element={<InsertProduct />} />
            <Route exact path="/admin_page/insert_category" element={<InsertCategory />} />
            <Route exact path="/admin_page/insert_employee" element={<InsertEmployee />} />
            <Route exact path="/customer_page/pay" element={<Payment />} />
            <Route exact path="/reset_password" element={<ResetPassword />} />
          </Routes>
        
      </Router>
    </div>
  );
}

export default App;
