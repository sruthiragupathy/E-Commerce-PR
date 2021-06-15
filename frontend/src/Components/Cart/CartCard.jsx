import { useState } from 'react';
import {
	productAddToWishlist,
	productRemoveFromCart,
	updateCart,
} from '../../utils/CallRestApi';
import { useAuth } from '../../Context/AuthContext';
import { useProduct } from '../../Context/ProductContext';
import { calculateOriginalPrice, isInWishlist } from '../CardCommonFunctions';

import './CartCard.css';

export const CartCard = ({ _id, product, quantity }) => {
	const { image, brandName, description, price, discountByPercentage, seller } =
		product;
	const { state, dispatch } = useProduct();
	const { auth } = useAuth();
	const [qty, setQty] = useState(quantity);

	const addToWishlist = async (e) => {
		e.preventDefault();
		await productRemoveFromCart(e, dispatch, auth.token, product._id);
		if (!isInWishlist(state.wishlist, product._id))
			await productAddToWishlist(dispatch, auth.token, product._id);

		dispatch({
			type: 'TOGGLE_TOAST',
			payload: '1 item added to wishlist',
			value: true,
		});
	};

	const removeHandler = (e) => {
		e.preventDefault();
		dispatch({ type: 'SET_OVERLAY' });
		dispatch({ type: 'SET_MODALID', payload: _id });
	};

	return (
		<>
			<div className='horizontal-card mb'>
				<div className='horizontal-card__cart-item'>
					<div className='cart-item__img'>
						<img className='responsive-img' src={image} alt={brandName} />
					</div>
					<div className='cart-item__flex'>
						<div className='cart-item__details'>
							<div className='details__primary'>
								<p className='rm'>
									<strong>{brandName}</strong>
								</p>
								<div className='description light rm'>{description}</div>
								<small>Sold by: {seller}</small>
							</div>
							<div className='details__btns'>
								{qty - 1 === 0 ? (
									<button className='btn btn-primary disabled' disabled>
										-
									</button>
								) : (
									<button
										className='btn btn-primary'
										onClick={(e) => {
											e.preventDefault();
											updateCart(qty - 1, dispatch, auth.token, _id);
											setQty((qty) => qty - 1);
										}}>
										-
									</button>
								)}
								<span>{qty}</span>
								<button
									className='btn btn-primary'
									onClick={(e) => {
										e.preventDefault();
										updateCart(qty + 1, dispatch, auth.token, _id);
										setQty((qty) => qty + 1);
									}}>
									+
								</button>
							</div>
						</div>
						<div className='cart-item__price'>
							<h5 className='rm'>
								<strong>Rs. {qty * Number(price)} </strong>
							</h5>
							<span className='rm light strikethrough'>
								Rs. {calculateOriginalPrice(price, discountByPercentage, qty)}{' '}
							</span>
							<span className='price__discount'>
								({discountByPercentage}% OFF)
							</span>
						</div>
					</div>
				</div>
				<div className='horizontal-card__btns'>
					<div className='remove-container'>
						<button className='remove' onClick={removeHandler}>
							REMOVE
						</button>
					</div>
					<div>
						{
							<button className='move-to-wishlist' onClick={addToWishlist}>
								MOVE TO WISHLIST
							</button>
						}
					</div>
				</div>
			</div>
		</>
	);
};
