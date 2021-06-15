import { useProduct } from '../../Context/ProductContext';

import './MobileSortAndFilter.css';
import './FilterSideBar.css';
const sortByNames = [
	'Latest',
	'Discount',
	'Price : High to Low',
	'Price : Low to High',
];
export const MobileSortAndFilter = () => {
	const { state, dispatch } = useProduct();

	const sortButtonHandler = () => {
		dispatch({ type: 'OPEN_SORT' });
		dispatch({ type: 'SET_OVERLAY' });
	};

	const filterButtonHandler = () => {
		dispatch({ type: 'OPEN_FILTER' });
		dispatch({ type: 'SET_OVERLAY' });
	};

	const closeFilterHandler = () => {
		dispatch({ type: 'CLEAR_ALL_FILTERS' });
		dispatch({ type: 'OPEN_FILTER' });
		dispatch({ type: 'SET_OVERLAY' });
	};

	const getBrands = (products) => {
		const allBrandNamesWithDuplicates = products.map(
			(product) => product.brandName,
		);
		return allBrandNamesWithDuplicates
			.filter(
				(brandname, index) =>
					allBrandNamesWithDuplicates.indexOf(brandname) === index,
			)
			.sort();
	};
	return (
		<div className='mobile-sort-and-filter-wrapper'>
			<div className='mobile-sort-and-filter__buttons'>
				<button className='sort-btn' onClick={sortButtonHandler}>
					<i className='fa fa-sort'></i> SORT
				</button>
				<button className='filter-btn' onClick={filterButtonHandler}>
					<i className='fa fa-filter'></i> FILTER
				</button>
			</div>
			{state.openSort && (
				<div className='sort-wrapper'>
					<div className='flex padding filter-border-bottom'>
						<h4 className='sort-by-heading  rm'>SORT BY</h4>
						<button onClick={sortButtonHandler}>
							<i className='fa fa-close'></i>
						</button>
					</div>
					{sortByNames.map((name, index) => {
						return (
							<button
								key={index}
								className={`sort-by-names-btn ${
									state.sort[name.toLowerCase()] ? 'current-sort' : ''
								}`}
								onClick={() => {
									dispatch({ type: 'SORT', payload: name });
									dispatch({ type: 'OPEN_SORT' });
									dispatch({ type: 'SET_OVERLAY' });
								}}>
								{name}
							</button>
						);
					})}
				</div>
			)}
			{state.openFilter && (
				<div className='filter-wrapper filter-wrapper-height'>
					<div className='common-filters filter-border-bottom'>
						<div className='flex padding'>
							<h4 className='rm'>FILTERS</h4>
							<button
								className='clear-all'
								onClick={() => dispatch({ type: 'CLEAR_ALL_FILTERS' })}>
								CLEAR ALL
							</button>
						</div>
						<div className='individual-filter'>
							<label>
								<input
									type='checkbox'
									name='in_stock_only'
									className='filter-margin'
									checked={state.otherFilter.in_stock}
									onChange={() =>
										dispatch({ type: 'OTHER_FILTER', payload: 'in_stock' })
									}
								/>
								In Stock Only
							</label>
						</div>
						<div className='individual-filter'>
							<label htmlFor='price'>
								Price Range : 0 to {state.otherFilter.ranger_value}
							</label>
							<br />
							<input
								type='range'
								min='0'
								max='1000'
								step='100'
								value={state.otherFilter.ranger_value}
								className='filter-margin'
								onChange={(e) =>
									dispatch({
										type: 'OTHER_FILTER',
										payload: 'ranger_value',
										value: e.target.value,
									})
								}
							/>
						</div>
					</div>

					<h4 className='rm padding'>FILTER BY BRANDS</h4>
					{getBrands(state.products).map((item, index) => {
						return (
							<div key={index} className='individual-filter'>
								<label>
									<input
										type='checkbox'
										name={item}
										className='filter-margin'
										checked={state.brandFilter[item]}
										onChange={() => {
											dispatch({ type: 'FILTER_BY_BRAND', payload: item });
										}}
									/>
									{item}
								</label>
							</div>
						);
					})}
					<div className='mobile-sort-and-filter__buttons'>
						<button className='sort-btn' onClick={closeFilterHandler}>
							CLOSE
						</button>
						<button
							className='filter-btn purple-txt'
							onClick={filterButtonHandler}>
							APPLY
						</button>
					</div>
				</div>
			)}
		</div>
	);
};
