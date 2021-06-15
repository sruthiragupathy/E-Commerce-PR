import axios from 'axios';
import { BACKEND } from '../api';
import { isInWishlist } from '../Components/CardCommonFunctions';
import { hideToast } from './hideToast';

class RESTError extends Error {
	constructor(message) {
		super(message);
		this.name = 'RESTError';
	}
}

export const RestApiCalls = async (method, route, data) => {
	switch (method) {
		case 'GET': {
			try {
				const res = await axios({
					method: 'GET',
					url: route,
				});
				if (res.status === 200) {
					return {
						response: res.data,
						error: false,
					};
				} else {
					throw new RESTError('OOPS!Could not fetch data from Server');
				}
			} catch (error) {
				return { response: error, error: true };
			}
		}
		case 'POST': {
			try {
				const res = await axios.post(route, data);
				return res.data;
			} catch (error) {
				return { success: false, error: error.message };
			}
		}
		case 'PUT': {
			try {
				const res = await axios.put(route, data);
				return res.data;
			} catch (error) {
				return { success: false, error: error.message };
			}
		}
		case 'DELETE': {
			try {
				const res = await axios.delete(route);
				return res.data;
			} catch (error) {
				return { success: false, error: error.message };
			}
		}

		default:
			return 'The provided method is not valid';
	}
};

export const productAddToCart = async (e, dispatch, token, productId) => {
	e.preventDefault();
	if (!token) {
		dispatch({ type: 'TOGGLE_TOAST', payload: 'Login Toast' });
		hideToast(dispatch, 3000);
	} else {
		dispatch({ type: 'TOGGLE_TOAST', payload: 'adding to cart...' });
		try {
			const {
				data: { response },
				status,
			} = await axios({
				method: 'POST',
				url: `${BACKEND}/cart/${productId}`,
				headers: {
					authorization: token,
				},
			});
			if (status === 200) {
				dispatch({ type: 'SET_CART', payload: response });
				dispatch({ type: 'TOGGLE_TOAST', payload: '1 item added to cart' });
				hideToast(dispatch);
			}
		} catch (error) {
			console.error(error);
			dispatch({ type: 'TOGGLE_TOAST', payload: 'Cart Updation failed' });
			hideToast(dispatch);
		}
	}
};

export const productRemoveFromCart = async (e, dispatch, token, productId) => {
	e.preventDefault();
	dispatch({
		type: 'TOGGLE_TOAST',
		payload: 'removing from cart...',
		value: true,
	});
	try {
		const {
			data: { response },
			status,
		} = await axios({
			method: 'DELETE',
			url: `${BACKEND}/cart/${productId}`,
			headers: {
				authorization: token,
			},
		});
		if (status === 200) {
			dispatch({ type: 'SET_CART', payload: response });
			dispatch({
				type: 'TOGGLE_TOAST',
				payload: '1 item removed from cart',
			});
			hideToast(dispatch);
		}
	} catch (error) {
		console.error(error);
		dispatch({ type: 'TOGGLE_TOAST', payload: 'Cart Updation failed' });
		hideToast(dispatch);
	}
};

export const productRemoveFromWishlist = async (dispatch, token, productId) => {
	dispatch({
		type: 'TOGGLE_TOAST',
		payload: 'removing from wishlist...',
		value: true,
	});
	try {
		const {
			data: { response },
			status,
		} = await axios({
			method: 'DELETE',
			url: `${BACKEND}/wishlist/${productId}`,
			headers: {
				authorization: token,
			},
		});
		if (status === 200) {
			dispatch({ type: 'SET_WISHLIST', payload: response });
			dispatch({
				type: 'TOGGLE_TOAST',
				payload: '1 item removed from wishlist',
			});
			hideToast(dispatch);
		}
	} catch (error) {
		console.error({ error });
		dispatch({ type: 'TOGGLE_TOAST', payload: 'Cart Updation failed' });
		hideToast(dispatch);
	}
};

export const productAddToWishlist = async (dispatch, token, productId) => {
	dispatch({
		type: 'TOGGLE_TOAST',
		payload: 'adding to wishlist...',
		value: true,
	});
	try {
		const {
			data: { response },
			status,
		} = await axios({
			method: 'POST',
			url: `${BACKEND}/wishlist/${productId}`,
			headers: {
				authorization: token,
			},
		});
		if (status === 200) {
			dispatch({ type: 'SET_WISHLIST', payload: response });
			dispatch({
				type: 'TOGGLE_TOAST',
				payload: '1 item added to wishlist',
			});
			hideToast(dispatch);
		}
	} catch (error) {
		console.error({ error });
		dispatch({ type: 'TOGGLE_TOAST', payload: 'Cart Updation failed' });
		hideToast(dispatch);
	}
};

export const wishlistManipulation = async (
	e,
	state,
	dispatch,
	token,
	productId,
) => {
	e.preventDefault();
	if (!token) {
		dispatch({ type: 'TOGGLE_TOAST', payload: 'Login Toast' });
		hideToast(dispatch, 3000);
	} else {
		if (isInWishlist(state.wishlist, productId)) {
			productRemoveFromWishlist(dispatch, token, productId);
		} else {
			await productAddToWishlist(dispatch, token, productId);
		}
	}
};

export const updateCart = async (quantity, dispatch, token, productId) => {
	try {
		const {
			data: { response },
			status,
		} = await axios({
			method: 'PUT',
			url: `${BACKEND}/cart/${productId}`,
			data: { quantity: quantity },
			headers: {
				authorization: token,
			},
		});
		if (status === 200) dispatch({ type: 'SET_CART', payload: response });
	} catch (error) {
		console.error({ error });
		dispatch({ type: 'TOGGLE_TOAST', payload: 'Cart Updation failed' });
		hideToast(dispatch);
	}
};

export const addAddressToDb = async (
	address,
	token,
	dispatch,
	successHandler,
) => {
	dispatch({
		type: 'TOGGLE_TOAST',
		payload: 'adding an address...',
		value: true,
	});
	try {
		const {
			data: { response },
			status,
		} = await axios({
			method: 'POST',
			url: `${BACKEND}/address`,
			data: { addAddress: address },
			headers: {
				authorization: token,
			},
		});

		if (status === 200) {
			successHandler(response);
			dispatch({ type: 'SET_ADDRESS', payload: response });
			dispatch({
				type: 'TOGGLE_TOAST',
				payload: 'Address has been added',
				value: true,
			});
			hideToast(dispatch);
		}
	} catch (error) {
		console.error({ error });
		dispatch({ type: 'TOGGLE_TOAST', payload: 'Address Updation failed' });
		hideToast(dispatch);
	}
};

export const updateAddress = async (
	editAddress,
	address,
	token,
	dispatch,
	successHandler,
) => {
	dispatch({
		type: 'TOGGLE_TOAST',
		payload: 'updating an address...',
		value: true,
	});
	try {
		const {
			data: { response },
			status,
		} = await axios({
			method: 'POST',
			url: `${BACKEND}/address/${editAddress}`,
			data: { addressFromBody: address },
			headers: {
				authorization: token,
			},
		});

		if (status === 200) {
			successHandler(response);
			dispatch({ type: 'SET_ADDRESS', payload: response.addresses });
			dispatch({
				type: 'TOGGLE_TOAST',
				payload: '1 address updated',
				value: true,
			});
			hideToast(dispatch);
		}
	} catch (error) {
		console.error({ error });
		dispatch({ type: 'TOGGLE_TOAST', payload: 'Address Updation failed' });
		hideToast(dispatch);
	}
};
export const removeAddress = async (dispatch, addressId, token) => {
	dispatch({
		type: 'TOGGLE_TOAST',
		payload: 'removing an address...',
		value: true,
	});
	try {
		const {
			data: { response },
			status,
		} = await axios({
			method: 'DELETE',
			url: `${BACKEND}/address/${addressId}`,
			headers: {
				authorization: token,
			},
		});
		if (status === 200) {
			dispatch({ type: 'SET_ADDRESS', payload: response });
			dispatch({
				type: 'TOGGLE_TOAST',
				payload: '1 address removed',
				value: true,
			});
			hideToast(dispatch);
		}
	} catch (error) {
		console.error({ error });
		dispatch({ type: 'TOGGLE_TOAST', payload: 'Address deletion failed' });
		hideToast(dispatch);
	}
};
