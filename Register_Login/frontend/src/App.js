import { BrowserRouter, Routes, Route } from "react-router-dom";
// import About from "./components/About";
import Dashboard from "./components/Dashboard";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from "./components/Layout";
import Login from "./components/Login";
// import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Forgot from "./components/forgot"
import ChangePassword from "./components/changePassword"
import Cart from "./components/cart"
import Order from "./components/order"

function App() {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        <Route exact path="/" element={<Login />}> </Route>
        
        <Route path="/register" element={<Register />}> </Route>

        <Route path="/forgot" element={<Forgot />}> </Route>
        
        <Route path="/changepassword" element={<ChangePassword />}> </Route>

        <Route path="/carts" element={<Cart />}> </Route>

        <Route path="/order" element={<Order />}> </Route>

        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
          {/* <Route path="about" element={<About />} /> */}
        </Route>

      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;