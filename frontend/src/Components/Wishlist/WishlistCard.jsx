import { useProduct } from "../../Context/ProductContext";
import { Link } from "react-router-dom";
import "./WishlistCard.css"
import { calculateOriginalPrice, getTrimmedDescription, isInCart } from "../CardCommonFunctions";
import { RestApiCalls } from "../../utils/CallRestApi";
import { BACKEND } from "../../api";
import { useAuth } from "../../Context/AuthContext";
import axios from "axios";


export const WishlistCard = ({product}) => {
        const {_id,image,brandName,description,price,outOfStock,discountByPercentage} = product;
        const {state,dispatch} = useProduct();
        const {auth} = useAuth();
        const hideToast = () => {
            setTimeout(() => {
                dispatch({type:"TOGGLE_TOAST",payload:"", value: false});
              }, 1000)
        }
            const removeFromWishlist = async (e) => {
                e.preventDefault();
                dispatch({type:"TOGGLE_TOAST",payload:"removing from wishlist...", value: true});
                const {data : {response, success}} = await axios.delete(`${BACKEND}/${auth.user._id}/wishlist/${_id}`);
                if(success) {
                dispatch({type: "SET_WISHLIST", payload: response.wishlistItems});
                dispatch({type:"TOGGLE_TOAST",payload:"1 item removed from wishlist", value: true});
                hideToast()
                }
        }

        
            const productAddToCartHandler = async (e) => {
                e.preventDefault()
                dispatch({type:"TOGGLE_TOAST",payload:"adding to cart...", value: true});
                const {response} = await RestApiCalls("POST", `${BACKEND}/${auth.user._id}/cart/${_id}`)
                dispatch({type: "SET_CART", payload: response.cartItems});
                dispatch({type:"TOGGLE_TOAST",payload:"1 item added to cart", value: true});
                hideToast()
            }
        
        return (

            <div className={`wishlist-card ${outOfStock ? "overlay" : ""} pointer`} key = {_id} >
                {outOfStock && <div className="out-of-stock">OUT OF STOCK</div>}
                <img className="responsive-img" src={image} alt={brandName}/>
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
                        onClick = { productAddToCartHandler } 
                        disabled = {outOfStock}>Move to Cart</button>}
                    </div>
                </div>
                <button 
                className = "btn-icon br trash"
                onClick = {removeFromWishlist}>
                    <i className="fa fa-trash-o fa-2x"></i>
                </button>
            </div>
            

    )
}
// () => dispatch({type:"WISHLIST_ADD_OR_REMOVE",payload:isInWishlist(state.wishlist,_id)?getProductFromWishlistDb(state.wishlist,_id):product})