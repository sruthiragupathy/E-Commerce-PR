import React from 'react';
import { RightNavbar } from './RightNavbar';
import './Navbar.css';

import { NavLink } from 'react-router-dom';

const category = ['amaara', 'men', 'women', 'sneakers'];

const Navbar = ({ openHamburger, setOpenHamburger }) => {
	const toggleHamburgerMenu = () => {
		setOpenHamburger((prev) => !prev);
	};

	return (
		<nav className='navbar-component flex'>
			<div
				className={`hamburger-menu pointer ${openHamburger ? 'click' : ''}`}
				onClick={toggleHamburgerMenu}>
				<span className='hamburger-menu__line'></span>
				<span className='hamburger-menu__line'></span>
				<span className='hamburger-menu__line'></span>
			</div>
			<ul
				className={`menu__mobile-none rm rm-ul-padding ${
					openHamburger ? 'menu__mobile' : ''
				}`}>
				{category.map((item, index) => {
					return item === 'amaara' ? (
						<NavLink to='/' key={index}>
							<button
								className='sidebar__item'
								activeClassName='mobile__current-category'
								onClick={toggleHamburgerMenu}>
								HOME
							</button>
						</NavLink>
					) : (
						<NavLink to={`/products/${item}`} key={index}>
							<button
								className='sidebar__item'
								activeClassName='mobile__current-category'
								onClick={toggleHamburgerMenu}>
								{item}
							</button>
						</NavLink>
					);
				})}
			</ul>
			<NavLink to='/' className='mobile-view'>
				<button className='sidebar__item amaara mobile-view'>amaara</button>
			</NavLink>
			<ul className='nav__category rm-ul-padding flex'>
				{category.map((item, index) => {
					return item === 'amaara' ? (
						<NavLink to='/' end key={index} className='sidebar__item amaara'>
							{item}
						</NavLink>
					) : (
						<NavLink
							to={`/products/${item}`}
							key={index}
							className='sidebar__item'
							activeClassName='current-category'>
							{item}
						</NavLink>
					);
				})}
			</ul>
			<RightNavbar />
		</nav>
	);
};

export default Navbar;
