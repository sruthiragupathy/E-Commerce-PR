import './ProductDescription.css';
import { useNavigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { BACKEND } from '../../api';
import {
	productAddToCart,
	wishlistManipulation,
} from '../../utils/CallRestApi';

import {
	calculateOriginalPrice,
	isInCart,
	isInWishlist,
} from '../CardCommonFunctions';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { useProduct } from '../../Context/ProductContext';
import { useAuth } from '../../Context/AuthContext';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@material-ui/icons/Favorite';
import axios from 'axios';
import { Toast } from '../Toast/Toast';
import { StarRatingTool } from './StarRatingTool';

export const ProductDescription = () => {
	const navigate = useNavigate();
	const { productId } = useParams();
	const [product, setProduct] = useState('');
	const { state, dispatch } = useProduct();
	const { auth } = useAuth();
	useEffect(() => {
		(async function () {
			const {
				data: { response },
				status,
			} = await axios.get(`${BACKEND}/product/${productId}`);
			if (status === 200) {
				setProduct(response);
			}
		})();
	}, []);

	const goToCart = (e) => {
		e.preventDefault();
		navigate('/checkout/cart');
	};

	return (
		product && (
			<>
				<div className='product-description'>
					<div className='product-description__left'>
						<img src={product.image} alt='' className='responsive-img'></img>
					</div>
					<div className='product-description__right'>
						<div className='product-description__heading'>
							<h1 className='brand-name rm'>{product.brandName}</h1>
							<div className='description'>{product.description}</div>
							<StarRatingTool rating={product.rating} />
						</div>
						<div className='product-description__price'>
							<div className='price'>
								<h3 className='rm'>
									<strong>Rs. {product.price.split('.')[0]} </strong>
								</h3>
								{product.discountByPercentage !== 0 && (
									<h3 className='rm light strikethrough'>
										Rs.{' '}
										{calculateOriginalPrice(
											product.price,
											product.discountByPercentage,
										)}{' '}
									</h3>
								)}
								{product.discountByPercentage !== 0 && (
									<h3 className='rm discount'>
										({product.discountByPercentage}% OFF)
									</h3>
								)}
							</div>
							<small className='green-txt'>inclusive of all taxes</small>
							<div className='product-description__buttons flex'>
								{product.outOfStock ? (
									<button className='btn btn-primary flex disabled' disabled>
										<ShoppingCartIcon style={{ marginRight: '0.5rem' }} /> OUT
										OF STOCK
									</button>
								) : isInCart(state.cart, product._id) ? (
									<button className='btn btn-primary flex'>
										<ShoppingCartIcon
											style={{ marginRight: '0.5rem' }}
											onClick={(e) => goToCart(e)}
										/>{' '}
										GO TO CART
									</button>
								) : (
									<button
										className='btn btn-primary flex'
										onClick={(e) =>
											productAddToCart(e, dispatch, auth.token, product._id)
										}>
										<ShoppingCartIcon style={{ marginRight: '0.5rem' }} /> ADD
										TO CART
									</button>
								)}
								{isInWishlist(state.wishlist, product._id) ? (
									<Link to='/wishlist'>
										<button className='btn btn-outline-secondary flex'>
											<FavoriteIcon
												style={{ marginRight: '0.5rem', color: 'red' }}
											/>{' '}
											GO TO WISHLIST
										</button>
									</Link>
								) : (
									<button
										className='btn btn-outline-secondary flex'
										onClick={(e) =>
											wishlistManipulation(
												e,
												state,
												dispatch,
												auth.token,
												product._id,
											)
										}>
										<FavoriteBorderIcon style={{ marginRight: '0.5rem' }} />{' '}
										WISHLIST
									</button>
								)}
							</div>
						</div>
						<div className='product-description__features'>
							<div>
								{product.outOfStock
									? 'Currently Out of Stock'
									: 'Available now'}
							</div>
							<div>Cash on Delivery available</div>
						</div>
					</div>
				</div>
				{state.toast.message && <Toast message={state.toast.message} />}
			</>
		)
	);
};
