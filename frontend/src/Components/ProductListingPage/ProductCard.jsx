import React from 'react';
import './ProductCard.css';
import { useProduct } from '../../Context/ProductContext';
import { Link } from 'react-router-dom';
import {
	calculateOriginalPrice,
	getTrimmedDescription,
	isInCart,
	isInWishlist,
} from '../CardCommonFunctions';
import {
	productAddToCart,
	wishlistManipulation,
} from '../../utils/CallRestApi';
import { useAuth } from '../../Context/AuthContext';

export const ProductCard = ({ product }) => {
	const {
		_id,
		image,
		brandName,
		description,
		price,
		isnew,
		sale,
		outOfStock,
		discountByPercentage,
	} = product;
	const { state, dispatch } = useProduct();
	const { auth } = useAuth();

	return (
		<>
			<div className={`card ${outOfStock ? 'overlay' : ''} pointer`} key={_id}>
				{outOfStock && <div className='out-of-stock'>OUT OF STOCK</div>}
				<img className='responsive-img' src={image} alt={brandName} />
				{isnew && <span className='card__badge'>NEW</span>}
				{!isnew && discountByPercentage !== 0 && sale && (
					<span className='card__badge'>SALE</span>
				)}
				<div className='card__description'>
					<div className='primary'>
						<h4 className='brand-name rm'>{brandName}</h4>
						<small className='light'>
							{getTrimmedDescription(description)}
						</small>
						<div className='price'>
							<h5 className='rm'>
								<strong>Rs. {price.split('.')[0]} </strong>
							</h5>
							{discountByPercentage !== 0 && (
								<h5 className='rm light strikethrough'>
									Rs. {calculateOriginalPrice(price, discountByPercentage)}{' '}
								</h5>
							)}
							{discountByPercentage !== 0 && (
								<h5 className='rm discount'>({discountByPercentage}% OFF)</h5>
							)}
						</div>

						{isInCart(state.cart, _id) ? (
							<button className='btn btn-primary' disabled={outOfStock}>
								<Link to='/checkout/cart'>
									<span style={{ marginRight: '1rem' }}>Go to Cart</span>
									<i
										className='fa fa-arrow-right'
										style={{ fontSize: '1rem' }}></i>
								</Link>
							</button>
						) : (
							<button
								className='btn btn-primary'
								onClick={(e) => productAddToCart(e, dispatch, auth.token, _id)}
								disabled={outOfStock}>
								Add to Cart
							</button>
						)}
					</div>
					<button
						className={`btn-icon btn-social-engagement wishlist ${
							!isInWishlist(state.wishlist, _id) ? 'wishlist-purple' : ''
						}`}
						onClick={(e) =>
							wishlistManipulation(e, state, dispatch, auth.token, _id)
						}>
						<i className='fa fa-heart'></i>
					</button>
				</div>
			</div>
		</>
	);
};
