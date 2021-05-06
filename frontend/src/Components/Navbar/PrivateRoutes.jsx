import {Route,Navigate} from "react-router-dom";

import { useAuth } from "../../Context/AuthContext"

export const PrivateRoutes = ({path,...props}) => {
    const {auth} = useAuth();
    return auth.isLoggedIn ? 
    (
        <Route {...props} path = {path}/>
    ):
    (
        <Navigate state = {{from : path}} replace to = "/login"/>
    )
}
