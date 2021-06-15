import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { ProductProvider } from './Context/ProductContext';
import App from './App';
import { HashRouter as Router } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import ScrollToTop from './ScrollToTop';

const rootElement = document.getElementById('root');
ReactDOM.render(
	<StrictMode>
		<Router>
			<ScrollToTop />
			<AuthProvider>
				<ProductProvider>
					<App />
				</ProductProvider>
			</AuthProvider>
		</Router>
	</StrictMode>,
	rootElement,
);
