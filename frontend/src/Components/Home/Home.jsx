import { Link } from 'react-router-dom';
import { useProduct } from '../../Context/ProductContext';
import { Toast } from '../Toast/Toast';
import './Home.css';

export const Home = () => {
	const { state } = useProduct();
	return (
		<>
			<Link to='/products/women'>
				<div>
					<img
						src='https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2021/3/31/a6a1bba2-d8af-4feb-881d-325bd8545c071617211308576-Dk-banner.jpg'
						className='responsive-img'
						alt=''
					/>
				</div>
			</Link>
			<div className='home__wrapper'>
				<h1>Top Brands</h1>
				<div className='home__grid'>
					<Link to='/products/women'>
						<div className='grid__item'>
							<img
								src='https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/19/f0397d0f-9c2a-4c87-956e-9896b615b3061597840342772-Content-ethnicwear-trend-printparadise.jpg'
								className='responsive-img'
								alt=''
							/>
						</div>
					</Link>
					<Link to='/products/women'>
						<div className='grid__item'>
							<img
								src='https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/retaillabs/2020/8/21/99463248-ae80-47de-836f-3bafe2262bff1598029618274-Content-mostselling-Ethnicwear-Kurtasetsbiba.jpg'
								className='responsive-img'
								alt=''
							/>
						</div>
					</Link>
					<Link to='/products/women'>
						<div className='grid__item'>
							<img
								src='https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/7/28/e4fe9b08-9d0a-4349-868f-6ac5aa7123ed1595935030800-Content-ethnicwear-trend-Bsummerreadyethnicdresses.jpg'
								className='responsive-img'
								alt=''
							/>
						</div>
					</Link>
				</div>
			</div>
			{state.toast.message && <Toast message={state.toast.message} />}
		</>
	);
};
