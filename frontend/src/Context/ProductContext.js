import { createContext, useContext, useReducer } from 'react';
import { brandNameArray } from '../Database';
import { reducerFunction } from './reducerFunction';

const ProductContext = createContext();

const filterObject = {};

export const createObject = (brandNameArray, filterObject) => {
	for (let i = 0; i < brandNameArray.length; i++) {
		filterObject[brandNameArray[i]] = false;
	}
	return filterObject;
};

export const ProductProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducerFunction, {
		product: [],
		cart: [],
		wishlist: [],
		address: [],
		brandFilter: createObject(brandNameArray, filterObject),
		otherFilter: {
			ranger_value: 1000,
			in_stock: false,
		},
		sort: {
			latest: false,
			discount: false,
			'price : low to high': false,
			'price : high to low': false,
		},
		openFilter: false,
		openSort: false,
		overlay: false,
		modalId: '',
		toast: {
			value: false,
			message: '',
		},
	});

	return (
		<ProductContext.Provider value={{ state, dispatch }}>
			{children}
		</ProductContext.Provider>
	);
};

export const useProduct = () => {
	return useContext(ProductContext);
};
