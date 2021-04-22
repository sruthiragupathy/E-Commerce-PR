export const hideToast = (dispatch) => {
    setTimeout(() => {
        dispatch({type:"TOGGLE_TOAST",payload:"", value: false});
      }, 1000)
}