import { useAuth } from '../../Context/AuthContext';
import { useProduct } from '../../Context/ProductContext';
import { productRemoveFromCart } from '../../utils/CallRestApi';

import './Modal.css';

export const Modal = ({ product }) => {
	const { dispatch } = useProduct();
	const { auth } = useAuth();
	const cancelHandler = () => {
		dispatch({ type: 'SET_OVERLAY' });
	};

	return (
		<div className='modal-container'>
			<h2 className='rm'>Remove Item</h2>
			<p>Are you sure you want to remove this item?</p>
			<div className='modal__btns'>
				<button className='btn btn-outline-secondary' onClick={cancelHandler}>
					Cancel
				</button>
				<button
					className='btn btn-danger'
					onClick={(e) => {
						dispatch({ type: 'SET_OVERLAY' });
						productRemoveFromCart(e, dispatch, auth.token, product._id);
					}}>
					Remove
				</button>
			</div>
		</div>
	);
};
