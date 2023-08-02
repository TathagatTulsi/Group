import React, { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import jwtDecode from "jwt-decode";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import headers from './useHeader'


const Order = () => {

  const token = localStorage.getItem("token")
  var decodeToken = jwtDecode(token);
  const ownerId = decodeToken.user.id;

  const [order, setOrder] = useState([])

  async function getorder() {
    try {
      const res = await axios.get(`http://localhost:5000/getOrder?ownerId=${ownerId}`);
      setOrder(res.data.get);
      console.log("order=",res.data.get);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getorder();
  }, []);


  const calculateAmmount = () => {
    let Total = 0;
    order.forEach((product) => {
      const amount = product.productModel.price
      const counts = product.productCount
      Total += Number(amount) * Number(counts)
    });
    return Total
  }

  const orderCancle = async (id) => {
    try {
      const confirmed = window.confirm("Are you sure you want to cancel Your order");

      if (confirmed) {
        const res = await axios.delete(`http://localhost:5000/cancleorder?id=${id}`);
        console.log(res.data.destroy);
        getorder();
        toast.success("Your order has been cancel");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error");
    }
  }


  

  return (
    <div class="row">
      <p>Logged in : {decodeToken.user.name} {decodeToken.user.lastname}</p>
      <a className="navbar-item" href="/dashboard"> <img src="home.png" width="55" height="28" alt="logo" /> </a>
      <a className="navbar-item" href="/carts">
                        <img src="cart.png" width="35" height="28" alt="logo" />
                    </a>
      {order.length > 0 && order.map((dataObj) => (
        <div class="col-md-4" >
          <div class="card mb-4">
          <p class="card-header bg-info text-white">Product_Name :  {dataObj.productModel.name}</p>
          <div class="card-body">
          <p>Product_price :  {dataObj.productModel.price}</p>
          <p>Product count : {dataObj.productCount}</p>
          <p>Quantity : {dataObj.productCount}</p>
          <button class="btn btn-success" onClick={() => orderCancle(dataObj.id)}>Cancel Oder</button>
          </div>
          </div>
        </div>
      ))}
      <p>Total amount : {calculateAmmount()}</p>
    </div>
  )
}

export default Order