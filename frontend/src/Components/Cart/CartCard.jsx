import axios from "axios";
import { useState } from "react";
import { BACKEND } from "../../api";
import { RestApiCalls } from "../../utils/CallRestApi";
import { useAuth } from "../../Context/AuthContext";
import { useProduct } from "../../Context/ProductContext";
import { calculateOriginalPrice, isInWishlist } from "../CardCommonFunctions";
import { Modal } from "../Modal/Modal";
import "./CartCard.css"


export const CartCard = ({_id, product, quantity, isInCart}) => {
    const {image,brandName,description,price,discountByPercentage,seller} = product;
    const {state,dispatch} = useProduct();
    const {auth} = useAuth();
    const hideToast = () => {
        setTimeout(() => {
            dispatch({type:"TOGGLE_TOAST",payload:"", value: false});
          }, 1000)
    }
    const [qty, setQty ] = useState( quantity );

    const addToWishlist = async () => {
        dispatch({type:"TOGGLE_TOAST",payload:"adding to wishlist...", value: true});
        const {data : {response, success}} = await axios.delete(`${BACKEND}/${auth.user._id}/cart/${product._id}`);
        if(success) {
            dispatch({type: "SET_CART", payload: response.cartItems});
        }
        if(!isInWishlist(state.wishlist,_id)){
        const {response} = await RestApiCalls("POST", `${BACKEND}/${auth.user._id}/wishlist/${_id}`)
        dispatch({type: "SET_WISHLIST", payload: response.wishlistItems});
        }
        dispatch({type:"TOGGLE_TOAST",payload:"1 item added to wishlist", value: true});
        hideToast()


    }
    
    const quantityHandler = async ( type ) => {
        if(type === "+") {
            setQty(qty => qty + 1);
            const {response} = await RestApiCalls("PUT", `${BACKEND}/${auth.user._id}/cart/${_id}`, {quantity: qty+1})
            dispatch({type: "SET_CART", payload: response.cartItems})


        }
        else {
            setQty(qty => qty - 1);
            const {response, success} = await RestApiCalls("PUT", `${BACKEND}/${auth.user._id}/cart/${_id}`, {quantity: qty-1})
            if(success){
            dispatch({type: "SET_CART", payload: response.cartItems})
            }
        }
    }

    return (    <>
                    <div className="horizontal-card mb">
                        <div className="horizontal-card__cart-item">
                            <div className="cart-item__img">
                                <img className="responsive-img" src={image} alt={brandName}/>
                            </div>
                            <div className="cart-item__flex">
                                <div className="cart-item__details">
                                    <div className="details__primary">
                                        <p className =  "rm"><strong>{brandName}</strong></p>
                                        <div className="description light rm">{description}</div>
                                        <small>Sold by: {seller}</small>
                                    </div>
                                    <div className = "details__btns">
                                        {qty-1 === 0 ? 
                                        <button className="btn btn-primary disabled">-</button> : 
                                        <button className = "btn btn-primary" onClick = {() => quantityHandler("-")}>-</button> }
                                        <span>{ qty }</span>
                                        <button className = "btn btn-primary" onClick = {() => quantityHandler("+")}>+</button>
                                    </div>
                                </div>
                                <div className="cart-item__price">
                                    <h5 className = "rm"><strong>Rs. {qty * Number(price)} </strong></h5>
                                    <span className="rm light strikethrough">Rs. {calculateOriginalPrice(price, discountByPercentage, qty)} </span>
                                    <span className = "price__discount">({discountByPercentage}% OFF)</span>
                                </div>
                            </div>
                        </div>
                        <div className="horizontal-card__btns">
                            <div className = "remove-container">
                                <button className = "remove" onClick = {() => {
                                    dispatch({type:"SET_OVERLAY"})
                                    dispatch({type:"SET_MODALID", payload: _id})
                                }}>REMOVE</button>
                            </div>
                            <div>
                                {
                                    <button className = "move-to-wishlist" onClick = {addToWishlist}>MOVE TO WISHLIST</button>
                                }
                                
        
                            </div>
                        </div>
                    </div>
                    {state.overlay && state.modalId === _id && <Modal product = {product} />}

                </>
    )
}