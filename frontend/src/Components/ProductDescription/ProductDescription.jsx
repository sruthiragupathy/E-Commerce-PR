import "./ProductDescription.css";
import { useParams } from "react-router"
import { useEffect, useState } from "react";
import { BACKEND } from "../../api";
import { RestApiCalls } from "../../utils/CallRestApi";
import { calculateOriginalPrice, isInCart, isInWishlist } from "../CardCommonFunctions";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { useProduct } from "../../Context/ProductContext";
import { useAuth } from "../../Context/AuthContext";
import { hideToast } from "../../utils/hideToast";
import { Link } from "react-router-dom";
import FavoriteIcon from '@material-ui/icons/Favorite';
import axios from "axios";
import { Toast } from "../Toast/Toast";
import { StarRatingTool } from "./StarRatingTool";



export const ProductDescription = () => {
    const { productId } = useParams()
    const [product, setProduct] = useState("")
    const {state, dispatch} = useProduct();
    const {auth} = useAuth();
    useEffect(() => {
        // console.log("from useeffect")
        (async function() {
            const { response } = await RestApiCalls("GET",`${BACKEND}/product/${productId}`) ;
            if(response.success) {
            // console.log(response.response);
              setProduct(response.response)
            }
          })()
    }, [])
    const productAddToCartHandler = async () => {
        if(!auth.isLoggedIn) {
            dispatch({type:"TOGGLE_TOAST",payload:"Login Toast"});
            hideToast(dispatch,3000);
        }
        else {
        dispatch({type:"TOGGLE_TOAST",payload:"adding to cart..."});
        const {response} = await RestApiCalls("POST", `${BACKEND}/${auth.user._id}/cart/${product._id}`)
        dispatch({type: "SET_CART", payload: response.cartItems});
        dispatch({type:"TOGGLE_TOAST",payload:"1 item added to cart"});
        hideToast(dispatch)
        }
    }

    const productAddToWishlistHandler = async () => {
        if(!auth.isLoggedIn) {
            dispatch({type:"TOGGLE_TOAST",payload:"Login Toast"});
            hideToast(dispatch, 3000);
        }
        else {
        if(isInWishlist(state.wishlist,product._id)){
        dispatch({type:"TOGGLE_TOAST",payload:"removing from wishlist...", value: true});
        // const {response} = await RestApiCalls("DELETE", `${BACKEND}/${auth.user._id}/wishlist/${_id}`)
        const {data : {response, success}} = await axios.delete(`${BACKEND}/${auth.user._id}/wishlist/${product._id}`);
        if(success) {
        dispatch({type: "SET_WISHLIST", payload: response.wishlistItems});
        dispatch({type:"TOGGLE_TOAST",payload:"1 item removed from wishlist"});
        hideToast(dispatch)
        }
        }
        else {
        dispatch({type:"TOGGLE_TOAST",payload:"adding to wishlist...", value: true});
        const {response} = await RestApiCalls("POST", `${BACKEND}/${auth.user._id}/wishlist/${product._id}`)
        dispatch({type: "SET_WISHLIST", payload: response.wishlistItems});
        dispatch({type:"TOGGLE_TOAST",payload:"1 item added to wishlist"});
        hideToast(dispatch)
        }
        }
    }
    return product && 
        (<>
        <div className = "product-description">
            <div className = "product-description__left">
                <img src = {product.image} alt = "" className = "responsive-img"></img>
            </div>
            <div className = "product-description__right">
                <div className = "product-description__heading">
                    <h1 className = "brand-name rm">
                        {product.brandName}
                    </h1>
                    <div className = "description">
                        {product.description}
                    </div>
                    <StarRatingTool rating = { product.rating } />

                </div>
                <div className = "product-description__price">
                    <div className = "price">
                    <h3 className = "rm"><strong>Rs. {product.price.split(".")[0]} </strong></h3>
                        {product.discountByPercentage !== 0 && <h3 className="rm light strikethrough">Rs. {calculateOriginalPrice(product.price,product.discountByPercentage)} </h3>}
                        {product.discountByPercentage !== 0 && <h3 className="rm discount">({product.discountByPercentage}% OFF)</h3>}
                    </div>
                    <small className = "green-txt">inclusive of all taxes</small>
                    <div className = "product-description__buttons flex">
                        {product.outOfStock ?  
                            <button className = "btn btn-primary flex disabled" disabled>
                            <ShoppingCartIcon style = {{marginRight: "0.5rem"}}/> OUT OF STOCK
                            </button> :
                        isInCart(state.cart,product._id) ? 
                        <Link to = "/checkout/cart">
                        <button className = "btn btn-primary flex">
                            <ShoppingCartIcon style = {{marginRight: "0.5rem"}}/> GO TO CART
                            </button> 
                        </Link>:
                        <button className = "btn btn-primary flex" onClick = {productAddToCartHandler}>
                            <ShoppingCartIcon style = {{marginRight: "0.5rem"}}/> ADD TO CART
                        </button>
                        
                        }
                        {
                            isInWishlist(state.wishlist,product._id) ? 
                            <Link to = "/wishlist">
                                <button className = "btn btn-outline-secondary flex">
                                <FavoriteIcon style = {{marginRight: "0.5rem", color: "red"}}/> GO TO WISHLIST
                                </button> 
                            </Link> :
                            <button className = "btn btn-outline-secondary flex" onClick = {productAddToWishlistHandler}>
                                <FavoriteBorderIcon style = {{marginRight: "0.5rem"}}/> WISHLIST
                            </button>

                        }
                        
                    </div>
                </div>
                <div className = "product-description__features">
                    <div>{product.outOfStock ? "Currently Out of Stock" : "Available now"}</div>
                    {/* <div>Free Delivery on order above Rs. 799</div> */}
                    <div>Cash on Delivery available</div>
                </div>
            </div>
        </div>
        {state.toast.message && <Toast message = {state.toast.message}/>}
        </>)
}