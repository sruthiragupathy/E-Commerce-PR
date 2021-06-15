import { useAuth } from '../../Context/AuthContext';
import { useProduct } from '../../Context/ProductContext';
import { removeAddress } from '../../utils/CallRestApi';

export const AddressCard = ({
	address,
	addressState,
	setAddressState,
	setOpenForm,
	setEditAddress,
	openForm,
}) => {
	const {
		auth: { token },
	} = useAuth();
	const { dispatch } = useProduct();

	const editAddressHandler = () => {
		setOpenForm((prev) => true);
		setAddressState((prev) => ({
			name: address.name,
			mobileNumber: address.mobileNumber,
			pinCode: address.pinCode,
			address: address.address,
			town: address.town,
			state: address.state,
		}));
		setEditAddress((prev) => address._id);
	};
	return (
		address && (
			<div className='address-card'>
				<input type='radio' name='address' checked></input>
				<div className='address-details'>
					<div className='bold-txt'>{address.name}</div>
					<div>
						{address.address}, {address.town}, {address.state} -{' '}
						{address.pinCode}
					</div>
					<div>
						Mobile <span className='bold-txt'>{address.mobileNumber}</span>
					</div>
					<div>Cash on Delivery available</div>
					<div>
						<button
							className='btn btn-outline-danger  remove-btn'
							onClick={() => removeAddress(dispatch, address._id, token)}>
							REMOVE
						</button>
						<button
							className='btn btn-outline-secondary edit-btn'
							onClick={editAddressHandler}>
							EDIT
						</button>
					</div>
				</div>
			</div>
		)
	);
};
