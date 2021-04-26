import { useEffect, useState } from "react";
import { useLocation,useNavigate } from "react-router"
import { BACKEND } from "../../api";
import { RestApiCalls } from "../../utils/CallRestApi";
import { useAuth,getNameFromEmail } from "../../Context/AuthContext";
import { useProduct } from "../../Context/ProductContext";


import "./Login.css"

const isValidEmail = (email) => {
    const emailRegex = new RegExp("[a-z][0-9]*@gmail.com");
    return emailRegex.test(email);
}

const isValidPassword = (password) => {
    const passwordRegex = new RegExp("[0-9]+");
    return password.length>6 && passwordRegex.test(password);
    // return false
}

export const SignUp = () => {
    const {auth, authDispatch} = useAuth();
    const {dispatch} = useProduct();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:""
    })
    const location = useLocation();
    const [error,setError] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
    })
    const [errorFromBackend, setErrorFromBackend] = useState("");
    const [loading, setLoading] = useState(false);
    useEffect (() => {
        auth.isLoggedIn && navigate("/");
    })
   const onChangeHandler = (e) => {
       setUser({...user,[e.target.name]:e.target.value})
   }
   const validateForm = () => {
       setError({firstName:"",
       lastName:"",
       email:"",
       password:""})
       let validationSuccess = true;
       if(!user.firstName){
           setError(error => ({...error,firstName:"Please Enter a valid name"}))
           validationSuccess = false;
       }
       if(!user.email || !isValidEmail(user.email)){
        setError(error => ({...error,email:"Please Enter a valid email"}))
        validationSuccess = false;

        }
        if(!user.password || !isValidPassword(user.password)){
        setError(error => ({...error,password:"password must be 6 characters long and must contain a number"}))
        validationSuccess = false;

        }
        return validationSuccess;
   }
   const hideToast = () => {
    setTimeout(() => {
        dispatch({type:"TOGGLE_TOAST",payload:""});
      }, 3000)
}
    const signUpHandler = async (from) => {
        setErrorFromBackend("");
        setLoading(true)
        if(validateForm()){
                const response = await RestApiCalls("POST", `${BACKEND}/signup`, user)
                // console.log(response);
                if(response?.success){
                    authDispatch({type:"SET_ISLOGGEDIN" , payload:true});
                    authDispatch({type:"SET_CURRENTUSER",payload:getNameFromEmail(user.email)});
                    authDispatch({type:"SET_USER",payload:response.user._id})
                    localStorage.setItem("logincredentials",
                    JSON.stringify({isUserLoggedIn:true, userName: getNameFromEmail(user.email), _id:response.user._id }))
                    navigate(from,{replace:true})
                    dispatch({type:"TOGGLE_TOAST",payload:"You have been signed up successfully, Happy Shopping"});
                    hideToast()
                }
                else {
                    setErrorFromBackend("User already exists")
                }
            }
            setLoading(false)

        }

    return <div className = "auth-wrapper flex-center">
        <div className = "login-container">
        <h1 className = "rm purple-txt login-title">Create an account</h1>
        <div className="input-group">
	        <input 
            type="text" 
            className = "input-area" 
            name = "firstName" 
            placeholder = "first name"
            value = {user.firstName}
            onChange = {onChangeHandler}/>
 	       {error.firstName && <small className = "red-txt">*{error.firstName}</small>}
        </div>
        <div className="input-group">
	        <input 
            type="text" 
            className = "input-area" 
            name = "lastName" 
            placeholder = "last name"
            value = {user.lastName}
            onChange = {onChangeHandler}/>
 	     
        </div>
        <div className="input-group">
	        <input 
            type="text" 
            className = "input-area" 
            name = "email" 
            placeholder = "email : johndoe@gmail.com"
            value = {user.email}
            onChange = {onChangeHandler}/>
 	        {error.email && <small className = "red-txt">*{error.email}</small>}
        </div>
        <div className="input-group">
	        <input 
            type="password" 
            className = "input-area" 
            name = "password" 
            placeholder = "password"
            value = {user.password}
            onChange = {onChangeHandler}/>
 	        {error.password && <small className = "red-txt">*{error.password}</small>}
 	        
        </div>
        <div className = "login-btn__container">
            <button className = "btn btn-primary" onClick = {() => signUpHandler(location.state?.from?location.state.from:"/")}>{
            loading?"SIGNING IN.....":"CREATE AN ACCOUNT"}</button>
            {errorFromBackend && <div className = "alert danger-alert">
            <div><i className="fa fa-exclamation-circle fa-2x"></i></div>
            <span>{errorFromBackend}</span>
            </div>}
            <small className = "mb">Have an account? <span className= "purple-txt underline pointer" onClick = {() => navigate("/login")}>Login</span></small>
        </div>
    </div>
    </div>
}