import axios from "axios";
import { BACKEND } from "../../api";
import { useAuth } from "../../Context/AuthContext";
import { useProduct } from "../../Context/ProductContext"
import "./Modal.css"


export const Modal = ({product}) => {
    const {dispatch} = useProduct();
    const {auth} = useAuth();
    const cancelHandler = () => {
        dispatch({type: "SET_OVERLAY"})

    }
    const hideToast = () => {
        setTimeout(() => {
            dispatch({type:"TOGGLE_TOAST",payload:"", value: false});
          }, 1000)
    }
    const removeFromCart = async () => {
        dispatch({type: "SET_OVERLAY"});
        dispatch({type:"TOGGLE_TOAST",payload:"removing from cart...", value: true});
        
        const {data : {response, success}} = await axios.delete(`${BACKEND}/${auth.user._id}/cart/${product._id}`);
        if(success) {
        dispatch({type: "SET_CART", payload: response.cartItems});
        dispatch({type:"TOGGLE_TOAST",payload:"1 item removed from cart", value: true});
        hideToast()
        }
}
    return (
        <div className="modal-container">
	        <h2 className = "rm">Remove Item</h2>
            <p>Are you sure you want to remove this item?</p>
            <div className="modal__btns">
    	        <button className="btn btn-outline-secondary" onClick = {cancelHandler}>Cancel</button>
                <button className="btn btn-danger" onClick  = {removeFromCart}>Remove</button>
            </div>
        </div>
            
        )}