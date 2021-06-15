import { useLocation, useNavigate } from 'react-router';
import './Login.css';
import { useEffect, useState } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { useProduct } from '../../Context/ProductContext';

export const Login = () => {
	const navigate = useNavigate();
	const { auth, LoginUserWithCredentials } = useAuth();
	const location = useLocation();
	const { dispatch } = useProduct();
	const [user, setUser] = useState({
		email: '',
		password: '',
	});
	const [error, setError] = useState({
		email: '',
		password: '',
	});
	const [errorFromBackend, setErrorFromBackend] = useState('');
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		auth.token && navigate('/');
	});

	const validateForm = () => {
		setError({
			email: '',
			password: '',
		});
		let validationSuccess = true;

		if (!user.email) {
			setError((error) => ({ ...error, email: 'Please Enter a valid email' }));
			validationSuccess = false;
		}
		if (!user.password) {
			setError((error) => ({
				...error,
				password: 'Please Enter a valid password',
			}));
			validationSuccess = false;
		}
		return validationSuccess;
	};

	const onChangeHandler = (e) => {
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
	};
	const hideToast = () => {
		setTimeout(() => {
			dispatch({ type: 'TOGGLE_TOAST', payload: '', value: false });
		}, 3000);
	};
	const loginHandler = async () => {
		setErrorFromBackend('');
		setLoading(true);
		if (validateForm()) {
			const response = await LoginUserWithCredentials(
				user,
				location.state?.from ? location.state.from : '/',
			);
			if (response.status === 200) {
				dispatch({
					type: 'TOGGLE_TOAST',
					payload: 'You have been logged in successfully, Happy Shopping',
					value: true,
				});
				hideToast();
			}
			if (response.status !== 200) {
				setErrorFromBackend(response.response.data.error);
			}
		}
		setLoading(false);
	};
	return (
		<div className='auth-wrapper flex-center'>
			<div className='login-container'>
				<h1 className='rm purple-txt login-title'>Login</h1>
				<div className='input-group'>
					<input
						type='text'
						className='input-area'
						placeholder='email'
						value={user.email}
						name='email'
						onChange={onChangeHandler}
					/>
					{error.email && <small className='red-txt'>*{error.email}</small>}
				</div>
				<div className='input-group'>
					<input
						type='password'
						className='input-area'
						placeholder='password'
						value={user.password}
						name='password'
						onChange={onChangeHandler}
					/>
					{error.password && (
						<small className='red-txt'>*{error.password}</small>
					)}
				</div>
				<div className='login-btn__container'>
					{loading ? (
						<button className='btn btn-primary'>LOGGING IN...</button>
					) : (
						<button className='btn btn-primary' onClick={loginHandler}>
							LOGIN
						</button>
					)}
					{errorFromBackend && (
						<div className='alert danger-alert'>
							<div>
								<i className='fa fa-exclamation-circle fa-2x'></i>
							</div>
							<span>{errorFromBackend}</span>
						</div>
					)}
					<small className='mb'>
						Don't have an account?{' '}
						<span
							className='purple-txt underline pointer'
							onClick={() => navigate('/signup')}>
							Create an account
						</span>
					</small>
				</div>
			</div>
		</div>
	);
};
