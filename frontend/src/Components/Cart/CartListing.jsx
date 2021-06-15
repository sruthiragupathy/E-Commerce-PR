import { useProduct } from '../../Context/ProductContext';
import './CartListing.css';
import { CartCard } from './CartCard';
import { OrderSummary } from './OrderSummary';
import { Toast } from '../Toast/Toast';
import { getTotalOrderPrice } from '../CardCommonFunctions';
import { Checkout } from '../Checkout/Checkout';
import { Link } from 'react-router-dom';
import { Modal } from '../Modal/Modal';

export const CartListing = () => {
	const { state } = useProduct();

	return (
		<div>
			{state.cart.length === 0 ? (
				<div className='empty-product'>"Your Cart is empty"</div>
			) : (
				<div className='container'>
					<Checkout />
					<div className='cart-wrapper'>
						{state.overlay && <div className='background-overlay'></div>}
						<div className='cart-grid'>
							<div className='cart-heading flex'>
								<strong>My Shopping Bag ({state.cart.length} items)</strong>
								<strong>Total: Rs. {getTotalOrderPrice(state.cart)}</strong>
							</div>
							{state.cart.map(({ _id, product, quantity, isInCart }) => {
								return (
									<>
										<Link to={`/product/${product._id}`} key={_id}>
											<CartCard
												product={product}
												key={_id}
												quantity={quantity}
												isInCart={isInCart}
												_id={_id}
											/>
										</Link>
										{state.overlay && state.modalId === _id && (
											<Modal product={product} />
										)}
									</>
								);
							})}
						</div>
						<OrderSummary cart={state.cart} />
					</div>
				</div>
			)}
			{state.toast.message && <Toast message={state.toast.message} />}
		</div>
	);
};
