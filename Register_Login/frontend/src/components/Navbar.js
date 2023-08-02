import React from 'react'
import { useNavigate } from 'react-router-dom';
import logoutUser from '../token/logoutToken';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
const Navbar = () => {
    const user = logoutUser()
    const navigate = useNavigate();
    const addToCart = JSON.parse(localStorage.getItem("addToCart"))
    
    const Logout = async () => {
        localStorage.clear()
           navigate("/")
            toast.success('Logout Successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
    }
 
    return (
        <nav className="navbar is-light" role="navigation" aria-label="main navigation">
            <div className="container">
                <div className="navbar-brand">
                    <a className="navbar-item" href="/carts">
                        <img src="cart.png" width="35" height="28" alt="logo"  />({addToCart.length})
                    </a>
 
                    {/* <a href="/" role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a> */}
                </div>
 
                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <a href="/changepassword" className="navbar-item link-secondary"> Change Password </a>
                    </div>
 
                    <div className="navbar-end">
                        <div className="navbar-item ">
                            <h4 className='mr-4'>{user.name} {user.lastname}</h4> 
                            <div className="buttons ">
                                <button onClick={Logout} className="btn btn-dark">
                                    Log Out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
 
export default Navbar