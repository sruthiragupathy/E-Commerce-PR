import React from 'react';
import { NavLink } from 'react-router-dom';
import './Checkout.css';

export const Checkout = () => {
	return (
		<div className='flex-center checkout-nav'>
			<NavLink
				to='/checkout/cart'
				activeClassName='current-category'
				className='checkout-navlink'>
				Cart
			</NavLink>

			<span> ---------- </span>

			<NavLink
				to='/checkout/address'
				activeClassName='current-category'
				className='checkout-navlink'>
				Address
			</NavLink>
		</div>
	);
};
