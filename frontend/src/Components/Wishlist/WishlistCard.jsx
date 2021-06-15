import { useProduct } from '../../Context/ProductContext';
import { Link } from 'react-router-dom';
import './WishlistCard.css';
import {
	calculateOriginalPrice,
	getTrimmedDescription,
	isInCart,
} from '../CardCommonFunctions';
import {
	productAddToCart,
	wishlistManipulation,
} from '../../utils/CallRestApi';
import { useAuth } from '../../Context/AuthContext';

export const WishlistCard = ({ product }) => {
	const {
		_id,
		image,
		brandName,
		description,
		price,
		outOfStock,
		discountByPercentage,
	} = product;
	const { state, dispatch } = useProduct();
	const { auth } = useAuth();

	return (
		<div
			className={`wishlist-card ${outOfStock ? 'overlay' : ''} pointer`}
			key={_id}>
			{outOfStock && <div className='out-of-stock'>OUT OF STOCK</div>}
			<img className='responsive-img' src={image} alt={brandName} />
			<div className='card__description'>
				<div className='primary'>
					<h4 className='brand-name rm'>{brandName}</h4>
					<small className='light'>{getTrimmedDescription(description)}</small>
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
							onClick={(e) =>
								productAddToCart(e, dispatch, auth.token, product._id)
							}
							disabled={outOfStock}>
							Move to Cart
						</button>
					)}
				</div>
			</div>
			<button
				className='btn-icon br trash'
				onClick={(e) =>
					wishlistManipulation(e, state, dispatch, auth.token, product._id)
				}>
				<i className='fa fa-trash-o fa-2x'></i>
			</button>
		</div>
	);
};
