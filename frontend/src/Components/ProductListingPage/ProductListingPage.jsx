import React from 'react';
import { Link } from 'react-router-dom';
import { useProduct } from '../../Context/ProductContext';
import { Toast } from '../Toast/Toast';
import { FilterSideBar } from './FilterSideBar';
import { ProductCard } from './ProductCard';
import './ProductListingPage.css';
import { sortFunction } from './SortFunction';

export const ProductListingPage = ({ props, productCategory }) => {
	const { state } = useProduct();

	const transformProducts = (products) => {
		let products_to_filter = products;
		//sort based on instock
		//filter by brands and in stock
		const keysOfFilterObject = Object.keys(state.brandFilter);
		const checkedBrands = keysOfFilterObject.filter(
			(item) => state.brandFilter[item] === true,
		);
		if (state.otherFilter.in_stock) {
			products_to_filter = products_to_filter.filter((product) => {
				return product.outOfStock === false;
			});
		}
		if (checkedBrands.length !== 0) {
			products_to_filter = products_to_filter.filter((product) =>
				checkedBrands.includes(product.brandName),
			);
		}
		//list products based on price range
		products_to_filter = products_to_filter.filter(
			(product) => Number(product.price) <= state.otherFilter.ranger_value,
		);
		//sorting
		const keysOfSortObject = Object.keys(state.sort);
		const currentSortByType = keysOfSortObject.filter(
			(type) => state.sort[type] === true,
		);
		if (currentSortByType.length !== 0) {
			products_to_filter = sortFunction(
				products_to_filter,
				currentSortByType[0],
			);
		}
		products_to_filter.sort((a, b) => (b.outOfStock === false ? 1 : -1));
		return products_to_filter;
	};

	return (
		<div className='PLP-wrapper'>
			{/* {transformProducts(state.products)} */}
			{state.overlay && <div className='background-overlay'></div>}
			<FilterSideBar />
			<div className='product-flex'>
				{transformProducts(state.products).length !== 0 ? (
					transformProducts(state.products).map((product) => {
						return (
							<Link to={`/product/${product._id}`}>
								<ProductCard product={product} key={product._id} />
							</Link>
						);
					})
				) : (
					<div className='empty-product__PLP'>"No products to display"</div>
				)}
			</div>
			{state.toast.message && <Toast message={state.toast.message} />}
		</div>
	);
};
