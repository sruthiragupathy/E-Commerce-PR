import React from "react";
import "./ProductCard.css";
import {useProduct} from "../../Context/ProductContext";
import {Link} from "react-router-dom";
import { calculateOriginalPrice, getTrimmedDescription, isInCart, isInWishlist } from "../CardCommonFunctions";
import { RestApiCalls } from "../../utils/CallRestApi";
import { useAuth } from "../../Context/AuthContext";
import { BACKEND } from "../../api";
import axios from "axios";


export const ProductCard = ({product}) => {
    const {_id,image,brandName,description,price,isnew,sale,outOfStock,discountByPercentage} = product;
    const {state,dispatch} = useProduct();
    const {auth} = useAuth();


    const hideToast = (seconds = 1000) => {
        setTimeout(() => {
            dispatch({type: "TOGGLE_TOAST", payload: "", value: false});
          }, seconds)
    }

    

    const productAddToCartHandler = async (e) => {
        e.preventDefault();
        if(!auth.isLoggedIn) {
            dispatch({type:"TOGGLE_TOAST",payload:"Login Toast"});
            hideToast(3000);
        }
        else {
        dispatch({type:"TOGGLE_TOAST",payload:"adding to cart..."});
        const {response} = await RestApiCalls("POST", `${BACKEND}/${auth.user._id}/cart/${_id}`)
        dispatch({type: "SET_CART", payload: response.cartItems});
        dispatch({type:"TOGGLE_TOAST",payload:"1 item added to cart"});
        hideToast()
        }
    }

    const productAddToWishlistHandler = async (e) => {
        e.preventDefault();
        if(!auth.isLoggedIn) {
            dispatch({type:"TOGGLE_TOAST",payload:"Login Toast"});
            hideToast(3000);
        }
        else {
        if(isInWishlist(state.wishlist,_id)){
        dispatch({type:"TOGGLE_TOAST",payload:"removing from wishlist...", value: true});
        // const {response} = await RestApiCalls("DELETE", `${BACKEND}/${auth.user._id}/wishlist/${_id}`)
        const {data : {response, success}} = await axios.delete(`${BACKEND}/${auth.user._id}/wishlist/${_id}`);
        if(success) {
        dispatch({type: "SET_WISHLIST", payload: response.wishlistItems});
        dispatch({type:"TOGGLE_TOAST",payload:"1 item removed from wishlist"});
        hideToast()
        }
        }
        else {
        dispatch({type:"TOGGLE_TOAST",payload:"adding to wishlist...", value: true});
        const {response} = await RestApiCalls("POST", `${BACKEND}/${auth.user._id}/wishlist/${_id}`)
        dispatch({type: "SET_WISHLIST", payload: response.wishlistItems});
        dispatch({type:"TOGGLE_TOAST",payload:"1 item added to wishlist"});
        hideToast()
        }
        }
    }
    

    return (
        <>
        <div className={`card ${outOfStock ? "overlay" : ""} pointer`} key = {_id} >
            {outOfStock && <div className="out-of-stock">OUT OF STOCK</div>}
            <img className="responsive-img" src={image} alt={brandName}/>
            {isnew && <span className = "card__badge">NEW</span>}
            {!isnew && discountByPercentage !== 0 && sale && <span className = "card__badge">SALE</span>}
            <div className="card__description">
                <div className="primary">
                    <h4 className="brand-name rm">{brandName}</h4>
                    <small className="light">{getTrimmedDescription(description)}</small>
                    <div className="price">
                        <h5 className = "rm"><strong>Rs. {price.split(".")[0]} </strong></h5>
                        {discountByPercentage !== 0 && <h5 className="rm light strikethrough">Rs. {calculateOriginalPrice(price,discountByPercentage)} </h5>}
                        {discountByPercentage !== 0 && <h5 className="rm discount">({discountByPercentage}% OFF)</h5>}
                    </div>

                    {isInCart(state.cart,_id) ?
                    <button className = "btn btn-primary"  disabled = {outOfStock}>
                        <Link to = "/checkout/cart">
                            <span style = {{marginRight:"1rem"}}>Go to Cart</span> 
                            <i className = "fa fa-arrow-right" style = {{fontSize:"1rem"}}></i>
                        </Link>
                    </button>:
                    <button 
                    className = "btn btn-primary" 
                    onClick = {productAddToCartHandler} 
                    disabled = {outOfStock}>Add to Cart</button>}
                </div>
                <button 
                className = {`btn-icon btn-social-engagement wishlist ${!isInWishlist(state.wishlist,_id)?"wishlist-purple":""}`}
                // onClick = {() => dispatch({type:"WISHLIST_ADD_OR_REMOVE",payload:isInWishlist(state.wishlist,_id)?getProductFromWishlistDb(state.wishlist,_id):product})}
                onClick = {productAddToWishlistHandler}
                >
                    <i className="fa fa-heart"></i>
                </button>
            </div>
            
        </div>
        </>

                
    )
}