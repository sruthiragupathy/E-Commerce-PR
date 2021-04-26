import { BACKEND } from "../../api";
import { useAuth } from "../../Context/AuthContext"
import { useProduct } from "../../Context/ProductContext";
import { RestApiCalls } from "../../utils/CallRestApi"
import { hideToast } from "../../utils/hideToast";

export const AddressCard = ({address, addressState, setAddressState, setOpenForm, setEditAddress, openForm}) => {
    const { auth } = useAuth();
    const { dispatch } = useProduct();
    
    const removeAddressHandler = async () => {
        dispatch({type:"TOGGLE_TOAST",payload:"removing an address...", value: true});
        const { response, success } = await RestApiCalls("DELETE",`${BACKEND}/${auth.user._id}/address/${address._id}`) 
        if(success){
            dispatch({type: "SET_ADDRESS", payload: response.addresses})
            dispatch({type:"TOGGLE_TOAST",payload:"1 address removed", value: true});
            hideToast(dispatch);
        }
    }
    const editAddressHandler = () => {
        setOpenForm( prev => true )
        setAddressState (prev => ({
            name: address.name,
            mobileNumber: address.mobileNumber,
            pinCode: address.pinCode,
            address: address.address,
            town: address.town,
            state: address.state
        }))
        setEditAddress(prev => address._id)
    }
    return <div className = "address-card">
        <input type = "radio" name = "address" checked></input>
        <div className = "address-details">
            <div className = "bold-txt">{address.name}</div>
            <div>{address.address}, {address.town}, {address.state} - {address.pinCode}</div>
            <div>Mobile <span className = "bold-txt">{address.mobileNumber}</span></div>
            <div>Cash on Delivery available</div>
            <div>
                <button className = "btn btn-outline-danger  remove-btn" onClick  = {removeAddressHandler} >REMOVE</button>
                <button className = "btn btn-outline-secondary edit-btn" onClick = {editAddressHandler} >EDIT</button>
            </div>

            
        </div>

    </div>
}