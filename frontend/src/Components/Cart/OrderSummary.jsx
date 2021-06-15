import { Link } from 'react-router-dom';
import { useProduct } from '../../Context/ProductContext';
import { getTotalOrderPrice, totalMRP } from '../CardCommonFunctions';
import './OrderSummary.css';

export const OrderSummary = ({ cart }) => {
	const { state } = useProduct();
	return (
		<div className='order-summary'>
			<div className='cart-heading flex-center'>
				<strong>PRICE DETAILS ({state.cart.length} items)</strong>
			</div>
			<div className='order-summary__card'>
				<div className='flex'>
					<span>Total MRP</span>
					<span>Rs. {totalMRP(state.cart)}</span>
				</div>
				<div className='flex border-bottom'>
					<span>Discount on MRP</span>
					<span className='green-txt'>
						- Rs. {totalMRP(state.cart) - getTotalOrderPrice(state.cart)}
					</span>
				</div>
				<div className='flex bold-txt'>
					<span>Total Amount</span>
					<span>Rs. {getTotalOrderPrice(state.cart)}</span>
				</div>
				<Link to='/checkout/address' className='width-100'>
					<button className='btn btn-primary width-100'>PLACE ORDER</button>
				</Link>
			</div>
		</div>
	);
};
