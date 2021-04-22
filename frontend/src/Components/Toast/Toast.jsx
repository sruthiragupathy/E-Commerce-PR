import { useProduct } from "../../Context/ProductContext"
import "./Toast.css"
export const Toast = ({message}) => {
    const {state} = useProduct();
    
    return (
        <div className = {`toast ${state.toast.message ? "show-toast" : ""}`}>{message} 
        
        </div>
    )
}