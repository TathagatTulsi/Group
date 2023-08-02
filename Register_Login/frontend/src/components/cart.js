import React, { useEffect, useState } from "react"
// import { MDBCol } from "mdbreact";
import 'bootstrap/dist/css/bootstrap.min.css';
// import Table from 'react-bootstrap/Table';
import axios from "axios";
import jwtDecode from "jwt-decode";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const Carts = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token")
  var decodeToken = jwtDecode(token);
  const ownerId = decodeToken.user.id;

  const [addproducts, setAddproducts] = useState([]);
  const [productCount, setProductCount] = useState([]);

  const getCartProducts = async () => {
    // console.log("decode: ", decodeToken.user.id);
    const res = await axios.get(`http://localhost:5000/getCarts/${ownerId}`);
    setAddproducts(res.data)
    localStorage.setItem("addToCart", JSON.stringify(res.data))
  };

  useEffect(() => {
    getCartProducts();
  }, []);


  const deleteProduct = async (ProductId) => {
    try {
      const res = await axios.delete( `http://localhost:5000/deleteCart?ProductId=${ProductId}`);

      toast.success('Product Deleted', {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
                });

      await getCartProducts();
    } catch (error) {
      console.log(error)
    }
  }


  const totalPrice = () => {
    let total = 0
    addproducts.forEach((product) => {
      const productprice = product.productModel.price
      const productCounts = product.productCount
      total += Number(productprice) * Number(productCounts)
      console.log("total", total)
    })
    return total
  }

  useEffect(() => {
    setProductCount([]);
    addproducts?.forEach((product) => {
      setProductCount([ ...productCount, product?.productModel?.productCount ]);
    });
  }, [addproducts]);


    const updateProduct = async (ProductId) => {
      try {
        const res = await axios.post(`http://localhost:5000/updateCart`,
          {
            ProductId: ProductId,
            productCount,
            ownerId
          })

          console.log("object", res);
        if (res.data.success === true) {
          getCartProducts();
        
          return toast.success('Product Updated', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
        return toast.error(res.data.msg);
      } catch (error) {
        console.log(error);
      }
    }



  const CheckOut = async ( addproducts) => {

    const res = await axios.post(`http://localhost:5000/order`, {  data:addproducts});

    if (res.data.success) {
      navigate("/order")
      getCartProducts()

      toast.success('Order Placed', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    else {
      toast.error(res.addproducts.msg);
    }

  }

  return (

    <div class="row">
      <h4 className='mr-4'>Logged in : {decodeToken.user.name} {decodeToken.user.lastname}</h4>
      <a className="navbar-item" href="/dashboard"> <img src="home.png" width="55" height="28" alt="logo" /> </a>

      {addproducts.length > 0 && addproducts.map((dataObj, index) => (
        <div class="col-md-4" key={dataObj.productModel.id}>
          <div class="card mb-4">
            <div class="card-header bg-info text-white">
              {dataObj.productModel.name}
            </div>
            <div class="card-body">
              <p>Price: {dataObj.productModel.price}</p>
              <p>Manufacturing: {dataObj.productModel.mfg}</p>
              <p>Category: {dataObj.productModel.category}</p>

              <select  onChange={(e) => updateProduct()} value={productCount[index]}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="3">4</option>
                <option value="3">5</option>
                <option value="3">6</option>
                <option value="3">7</option>
              </select>

              <p class="mt-3">Quantity: {dataObj.productCount}</p>

              <button class="btn btn-success" onClick={() => deleteProduct(dataObj.productModel.id)}>Delete</button> &nbsp;
            </div>
          </div>
        </div>
        
        ))}
     
        <h4> Grand Total : Rs {totalPrice()}</h4> &nbsp;
    
    <button class="btn btn-success" onClick={() => CheckOut(addproducts)}>CheckOut</button>
    </div>

  )
}
export default Carts