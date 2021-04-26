import './App.css';
import React,{useEffect, useState} from "react";
import Navbar from "./Components/Navbar/Navbar"
import { ProductProvider, useProduct } from './Context/ProductContext';
import { ProductListingPage } from './Components/ProductListingPage/ProductListingPage';
import {
 Routes,
  Route,
} from "react-router";
import { CartListing } from './Components/Cart/CartListing';
import { WishlistListing } from './Components/Wishlist/WishlistListing';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Home } from './Components/Home/Home';
import { Login } from './Components/Login/Login';
import { SignUp } from './Components/Login/SignUp';
import { PrivateRoutes } from './Components/Navbar/PrivateRoutes';
import { useAuth } from './Context/AuthContext';
import { BACKEND } from './api';
import { Address } from './Components/Address/Address';
import { RestApiCalls } from './utils/CallRestApi';
import { ProductDescription } from './Components/ProductDescription/ProductDescription';

function App() {
  const [openHamburger, setOpenHamburger] = useState(false);
  const {state,dispatch} = useProduct();
  const [status,setStatus] = useState({
    loading:true,
    error:false
  })
  const {auth} = useAuth();
  // console.log({state});
  useEffect(() => {
    // setStatus({...status,loading:true})
    //fetching products
    (async function () {
      const {response,error} = await RestApiCalls("GET",`${BACKEND}/products`)
      if (!error) {
        dispatch({ type: "SET_PRODUCTS", payload: response.products});
      }
      setStatus({...status,loading:false});
    })();

    // //fetching cart
    // (async function () {
    //   const { response, error } = await RestApiCalls("GET", "api/carts");
    //   if (!error) {
    //     dispatch({ type: "SET_CART", payload: response });
    //     setStatus({...status,loading:false});

    //   }
    // })();

    // //fetching wishlist
    // (async function () {
    //   const { response, error } = await RestApiCalls("GET", "api/wishlists");
    //   if (!error) {
    //     dispatch({ type: "SET_WISHLIST", payload: response });
    //   }
    // })();
  }, []);

  useEffect (() => {
    // console.log({auth});
    auth.user._id && (async function() {
      // console.log("in auth")
      const { response } = await RestApiCalls("GET",`${BACKEND}/${auth.user._id}/cart`) ;
      if(response.success) {
        dispatch ({type: "SET_CART", payload: response.response.cartItems })
      }
    })() && (async function() {
      const { response } = await RestApiCalls("GET",`${BACKEND}/${auth.user._id}/wishlist`) ;
      if(response.success) {
        dispatch ({type: "SET_WISHLIST", payload: response.response.wishlistItems })
      }
    })() && (async function() {
      const { response } = await RestApiCalls("GET",`${BACKEND}/${auth.user._id}/address`) ;
      if(response.success) {
        dispatch ({type: "SET_ADDRESS", payload: response.response.addresses })
      }
    })()

  },[auth.user._id])
  if(state.overlay){
    document.body.style.overflow="hidden"
  }
  else {
    document.body.style.overflow="scroll"
  }
  return (
    <div className ="App">
      
      <Navbar
      openHamburger={openHamburger}
      setOpenHamburger={setOpenHamburger}
      />
      <div>
      {status.loading ? 
      <div className = "loader">
        <CircularProgress color = "inherit"/>
      </div> : 
      <Routes>
        <Route path = "/products/women" element = {<ProductListingPage />}/>
        <Route path = "/products/men" element = {<ProductListingPage/>}/>
        <Route path = "/products/sneakers" element = {<ProductListingPage/>}/>
        <Route path = "/"  element = {<Home/>}/>
        <Route path = "/product/:productId" element = {<ProductDescription />} />
        <PrivateRoutes path = "/checkout/cart" element = {<CartListing/>}/>
        <PrivateRoutes path = "/checkout/address" element = {<Address/>}/>
        <PrivateRoutes path = "/wishlist" element = {<WishlistListing/>}/>

      </Routes>} 
      </div>
      <Routes>
      <Route path = "/login" element = {<Login/>} />
        <Route path = "/signup" element = {<SignUp/>} />
      </Routes>

      {auth.loading && <div className = "loader">
        <CircularProgress color = "inherit"/>
      </div>}
    </div>
  );
}

export default App;
