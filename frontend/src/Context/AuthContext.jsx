
import { createContext, useContext, useEffect, useReducer } from "react";
import {useNavigate} from "react-router-dom";
import { BACKEND } from "../api";
import { RestApiCalls } from "../utils/CallRestApi";


const AuthContext = createContext();

const authReducer = (auth,{type,payload,value}) => {
    switch(type){
        case "SET_ISLOGGEDIN":
            return {...auth, isLoggedIn:payload}
        case "SET_CURRENTUSER":
            return {...auth, currentUser:payload}
        case "SET_LOADING":
            return {...auth, loading:!auth.loading}
        case "SET_USER": 
            return {...auth, user: {_id: payload}}
        default:
            return auth;

    }

}

export const getNameFromEmail = (email) => {
    return email.split("@")[0];
}

export const AuthProvider = ({children}) => {
    const [auth, authDispatch] = useReducer(authReducer,{
        isLoggedIn : false,
        currentUser : "",
        loading : false,
        user: {}
    });
    useEffect(() => {
        const userCredentials = JSON.parse(localStorage?.getItem("logincredentials"))
        // console.log(userCredentials.userName,userCredentials.isUserLoggedIn);
        userCredentials?.isUserLoggedIn && 
        authDispatch({type:"SET_ISLOGGEDIN",payload:userCredentials.isUserLoggedIn})
        userCredentials?.userName &&
        authDispatch({type:"SET_CURRENTUSER" ,payload:userCredentials.userName}) 
        userCredentials?._id &&
        authDispatch({type:"SET_USER" ,payload:userCredentials._id}) 
    },[])
    const navigate = useNavigate();
 
    const LoginUserWithCredentials = async(user,pathTo) => {
        try{
            const response = await RestApiCalls("POST", `${BACKEND}/login`, user)
            console.log(response);
            if(response?.success){
            localStorage.setItem("logincredentials",
            JSON.stringify({isUserLoggedIn:true, userName: getNameFromEmail(user.email), _id: response.response[0]._id }))
            authDispatch({type:"SET_ISLOGGEDIN" ,payload:true})
            authDispatch({type:"SET_CURRENTUSER",payload:getNameFromEmail(user.email)})
            authDispatch({type:"SET_USER",payload:response.response[0]._id})

            navigate(pathTo,{replace:pathTo})
            }
            return response
        }
        catch(err){
            console.log({err});
            return err;

        }
    }

    const logoutHandler = () => {
        authDispatch({type:"SET_LOADING"})
        setTimeout(() => {
            localStorage?.removeItem("logincredentials")
            authDispatch({type:"SET_ISLOGGEDIN",payload:false})
            authDispatch({type:"SET_LOADING"})
            navigate("/");

        },2000)
    }
    return (
        <AuthContext.Provider value = {{auth,authDispatch,LoginUserWithCredentials, logoutHandler}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}