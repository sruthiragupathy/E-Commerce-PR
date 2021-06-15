import React from 'react';
import { OrderSummary } from '../Cart/OrderSummary';
import { Checkout } from '../Checkout/Checkout';
import { AddressForm } from './AddressForm';
import './Address.css';
import { Toast } from '../Toast/Toast';
import { useProduct } from '../../Context/ProductContext';

export const Address = () => {
	const { state } = useProduct();
	return (
		<div>
			<Checkout />
			<div className='address-wrapper'>
				<AddressForm />
				<OrderSummary />
				{state.toast.message && <Toast message={state.toast.message} />}
			</div>
		</div>
	);
};
