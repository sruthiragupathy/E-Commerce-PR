import axios from 'axios';
import { createContext, useContext, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { BACKEND } from '../api';

const AuthContext = createContext();

const authReducer = (auth, { type, payload, value }) => {
	switch (type) {
		case 'SET_TOKEN':
			return { ...auth, token: payload };
		case 'SET_CURRENTUSER':
			return { ...auth, currentUser: payload };
		case 'SET_LOADING':
			return { ...auth, loading: !auth.loading };
		case 'SET_USER':
			return { ...auth, user: { _id: payload } };
		case 'RESET_USER':
			return { ...auth, user: {}, currentUser: '' };
		default:
			return auth;
	}
};

export const getNameFromEmail = (email) => {
	return email.split('@')[0];
};

export const AuthProvider = ({ children }) => {
	const [auth, authDispatch] = useReducer(authReducer, {
		token: '',
		currentUser: '',
		loading: false,
	});
	useEffect(() => {
		const userCredentials = JSON.parse(
			localStorage?.getItem('logincredentials'),
		);
		userCredentials?.token &&
			authDispatch({
				type: 'SET_TOKEN',
				payload: userCredentials.token,
			});
		userCredentials?.userName &&
			authDispatch({
				type: 'SET_CURRENTUSER',
				payload: userCredentials.userName,
			});
		userCredentials?._id &&
			authDispatch({ type: 'SET_USER', payload: userCredentials._id });
	}, []);
	const navigate = useNavigate();

	const LoginUserWithCredentials = async (user, pathTo) => {
		try {
			const response = await axios.post(`${BACKEND}/login`, user);
			if (response.status === 200) {
				localStorage.setItem(
					'logincredentials',
					JSON.stringify({
						token: response.data.token,
						userName: response.data.username,
					}),
				);
				authDispatch({ type: 'SET_TOKEN', payload: response.data.token });
				authDispatch({
					type: 'SET_CURRENTUSER',
					payload: response.data.username,
				});

				navigate(pathTo, { replace: pathTo });
			}
			return response;
		} catch (err) {
			return err;
		}
	};

	const logoutHandler = (to) => {
		authDispatch({ type: 'SET_LOADING' });
		setTimeout(() => {
			localStorage?.removeItem('logincredentials');
			authDispatch({
				type: 'SET_TOKEN',
				payload: '',
			});
			authDispatch({ type: 'SET_LOADING' });
			navigate(to);
		}, 2000);
	};
	return (
		<AuthContext.Provider
			value={{ auth, authDispatch, LoginUserWithCredentials, logoutHandler }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};
