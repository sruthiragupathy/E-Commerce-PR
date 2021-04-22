import React, { useState } from "react";
import { useProduct } from "../../Context/ProductContext";
import "./Navbar.css";
import {Link,NavLink,useNavigate} from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

export const RightNavbar = () => {
  const {
    state: { cart, wishlist },
  } = useProduct();
  const {auth, logoutHandler} = useAuth();
  const [hover, setHover] = useState(false)
  const navigate = useNavigate();
  const loginHandler = () => {
    navigate('/login')
   }
   const onMouseEnterHandler = () => {
     setHover(true)
   }
   const onMouseLeaveHandler = () => {
    setHover(false)
  }
  const logout = () => {
    logoutHandler();
    setHover(false);
  }
 
  return (
    <>
    <ul className="right flex-center rm-ul-padding">
      <div className="navbar__list pointer greet">
        {
          auth.isLoggedIn ? 
          <div onMouseOver = {onMouseEnterHandler}  className = "purple-txt flex-center">
            <i className = "fa fa-user purple-txt"></i> 
            <span>Hello {auth?.currentUser?auth.currentUser:""}!</span>
          </div> : 
          <div className = "purple-txt pointer" onClick = {loginHandler}>LOGIN / SIGNUP</div>
        }
      </div>
      
      
      <li className="navbar__list pointer">
        <div
          className="notification-badge-container"
        >
          
            <Link to = "/wishlist"><i className="fa fa-heart"></i></Link>
          
            { auth.isLoggedIn && <div className="notification-badge flex-center">
            <span>{wishlist.length}</span>
          </div>}
        </div>
      </li>
      
      
      <li className="navbar__list pointer">
        <div
          className="notification-badge-container"
        >
            <Link to = "/checkout/cart"><i className="fa fa-shopping-bag"></i></Link>
          
          { auth.isLoggedIn && <div className="notification-badge flex-center">
            <span>{cart.length}</span>
          </div> }
        </div>
      </li>
      
    </ul>
    { hover && <div className = "profile-card"  onMouseLeave = {onMouseLeaveHandler}>
    <NavLink to  = "/checkout/cart">My Cart</NavLink>
    <NavLink to = "/wishlist">My Wishlist</NavLink>
    <button className = "btn btn-outline-primary" onClick = {logout}>Logout</button>
  </div>
    }
    </>
  );
};
