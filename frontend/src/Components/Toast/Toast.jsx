import { Link } from 'react-router-dom';
import { useProduct } from '../../Context/ProductContext';
import './Toast.css';
export const Toast = ({ message }) => {
	const { state } = useProduct();

	return state.toast.message === 'Login Toast' ? (
		<div className={`toast ${state.toast.message ? 'show-toast' : ''}`}>
			You are not logged in, Please{' '}
			<Link to='/login' className='toast-login'>
				LOGIN
			</Link>
		</div>
	) : (
		<div className={`toast ${state.toast.message ? 'show-toast' : ''}`}>
			{message}{' '}
		</div>
	);
};
