export const calculateOriginalPrice = (
	price,
	discountByPercentage,
	quantity = 1,
) => {
	return (
		(Math.floor((discountByPercentage / 100) * price) + Number(price)) *
		quantity
	);
};
export const getTrimmedDescription = (description) => {
	return description.length > 20
		? description.slice(0, 21) + '...'
		: description;
};

export const isInCart = (cart, id) => {
	return cart.map((item) => item._id).includes(id);
};

export const isInWishlist = (wishlist, id) => {
	return wishlist.map((item) => item._id).includes(id);
};

export const getProductFromWishlistDb = (wishlist, id) =>
	wishlist.find((product) => product.id === id);

export const getTotalOrderPrice = (cart) => {
	return cart.reduce((acc, currentCartItem) => {
		return (
			acc + Number(currentCartItem.product.price) * currentCartItem.quantity
		);
	}, 0);
};

export const totalMRP = (cart) => {
	return cart.reduce((acc, currentCartItem) => {
		return (
			acc +
			calculateOriginalPrice(
				Number(currentCartItem.product.price),
				Number(currentCartItem.product.discountByPercentage),
				currentCartItem.quantity,
			)
		);
	}, 0);
};
