import React, { useState } from "react";
import { useProduct } from "../../Context/ProductContext";
import { isValidMobileNumber, isValidPinCode } from "../../utils/formValidationFunctions";
import { AddressCard } from "./AddressCard";
import { RestApiCalls } from '../../utils/CallRestApi';
import "./AddressForm.css"
import { BACKEND } from "../../api";
import { useAuth } from "../../Context/AuthContext";
import { hideToast } from "../../utils/hideToast";



export const AddressForm = () => {
    const [ address, setAddress ] = useState({
        name: "",
        mobileNumber: "",
        pinCode: "",
        address: "",
        town: "",
        state: ""
    })
    const [ error, setError ] = useState({
        name: "",
        mobileNumber: "",
        pinCode: "",
        address: "",
        town: "",
        state: ""
    })
    const [ editAddress, setEditAddress ] = useState("");
    const {state, dispatch} = useProduct();
    const {auth } = useAuth();
    const [ openForm, setOpenForm ] = useState(false)
    const formValidate = () => {
        setError({
            name: "",
            mobileNumber: "",
            pinCode: "",
            address: "",
            town: "",
            state: ""
        })
        let validationSuccess = true;
        if(!address.name){
            setError(error => ({...error, name: "Please enter a valid name"}))
            validationSuccess = false
        }
        if(!address.mobileNumber || !isValidMobileNumber(address.mobileNumber)){
            setError(error => ({...error, mobileNumber: "Please enter a valid mobile number"}))
            validationSuccess = false
        }
        if(!address.pinCode || !isValidPinCode(address.pinCode)){
            setError(error => ({...error, pinCode: "Please enter a valid pin code"}))
            validationSuccess = false
        }
        if(!address.address){
            setError(error => ({...error, address: "Please enter a valid address"}))
            validationSuccess = false
        }
        if(!address.town){
            setError(error => ({...error, town: "Please enter a valid town"}))
            validationSuccess = false
        }
        if(!address.state){
            setError(error => ({...error, state: "Please enter a valid state"}))
            validationSuccess = false
        }
        return validationSuccess;
    }
    const successHandler = (response) => {
        console.log({response});
        dispatch({type: "SET_ADDRESS", payload: response.addresses})
        setAddress({
        name: "",
        mobileNumber: "",
        pinCode: "",
        address: "",
        town: "",
        state: ""
        })
        setOpenForm(prev => false)
    }
    const addAddress = async () => {
        if(formValidate()){
            if(editAddress) {
            dispatch({type:"TOGGLE_TOAST",payload:"updating an address...", value: true});
            let {response, success} = await RestApiCalls("POST", `${BACKEND}/${auth.user._id}/address/${editAddress}`, address)
                
            if( success ) {
                successHandler(response)
            }
            setEditAddress(prev => "")
            dispatch({type:"TOGGLE_TOAST",payload:"1 address updated", value: true});
            hideToast(dispatch)
            }
            else {
            dispatch({type:"TOGGLE_TOAST",payload:"adding an address...", value: true});
            let {response, success} = await RestApiCalls("POST", `${BACKEND}/${auth.user._id}/address`, address)
            if( success ) {
                successHandler(response)
            }
            dispatch({type:"TOGGLE_TOAST",payload:"Address has been added", value: true});
            hideToast(dispatch)
            }
            
        }
    }
   
    const onChangeHandler = (e) => {
        setAddress({...address, [e.target.name]: e.target.value})
    }
    return (
    <div className = "address-container">
    { openForm && <div className = "form-container">
        <h5>CONTACT DETAILS</h5>
        <div className="input-group">
	        <input 
            type="text" 
            className = "input-area"
            name = "name"
            value = {address.name}
            placeholder = "Name"
            onChange = {onChangeHandler}/>
 	        {/* <label for="email">Name</label> */}
 	       {error.name && <small className = "red-txt">*{error.name}</small>}
        </div>
        <div className="input-group">
	        <input 
            type="text" 
            className = "input-area"
            name = "mobileNumber"
            value = {address.mobileNumber}
            placeholder = "Mobile Number"
            onChange = {onChangeHandler}/>
 	        {/* <label for="Mobile No">Mobile No</label> */}
 	       {error.mobileNumber && <small className = "red-txt">*{error.mobileNumber}</small>}

        </div>
        <h5>CONTACT DETAILS</h5>
        <div className="input-group">
	        <input 
            type="text" 
            className = "input-area"
            name = "pinCode"
            placeholder = "Pin Code"
            value = {address.pinCode}
            onChange = {onChangeHandler}/>
 	        {/* <label for="Pin Code">Pin Code</label> */}
 	        {error.pinCode && <small className = "red-txt">*{error.pinCode}</small>}
        </div>
        <div className="input-group">
	        <input 
            type="text" 
            className = "input-area"
            name = "address"
            placeholder = "Address (House No, Building Street)"
            value = {address.address}
            onChange = {onChangeHandler}/>
 	        {/* <label for="address">Address (House No, Building Street)</label> */}
 	        {error.address && <small className = "red-txt">*{error.address}</small>}
        </div>
        <div className="input-group">
	        <input 
            type="text" 
            className = "input-area"
            name = "town"
            placeholder = "Town"
            value = {address.town}
            onChange = {onChangeHandler}/>
 	        {/* <label for="town">Locality/Town</label> */}
 	        {error.town && <small className = "red-txt">*{error.town}</small>}
        </div>
        <div className="input-group">
	        <input 
            type="text" 
            className = "input-area"
            name = "state"
            value = {address.state}
            placeholder = "State"
            onChange = {onChangeHandler}/>
 	        {/* <label for="state">State</label> */}
 	        {error.state && <small className = "red-txt">*{error.state}</small>}
        </div>
        {
        editAddress ? 
        <button className = "btn btn-primary" onClick = {addAddress}>UPDATE ADDRESS</button> :
        <button className = "btn btn-primary" onClick = {addAddress}>ADD ADDRESS</button>
        }

        
    </div>
    }
    {
        state.address.length !== 0 ? 
        <div>
            {openForm ? <button className = "btn btn-outline-danger new-address-btn" onClick = {() => setOpenForm(false)}> - Close Address Form</button> :<button className = "btn btn-outline-primary new-address-btn" onClick = {() => setOpenForm(true)}> + Add New Address</button> }
            {state.address.map( currentAddress => <AddressCard address = {currentAddress} key = {address._id} addressState = {address} setAddressState = {setAddress} openForm = {openForm} setOpenForm = {setOpenForm} setEditAddress = {setEditAddress}/>)}
        </div> : null
    }

    </div>)
}