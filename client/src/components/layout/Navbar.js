import React, {Fragment, useContext } from 'react'
import { Link } from 'react-router-dom';
import AuthContext from '../../context/author/authContext';
import FoodContext from '../../context/food/foodContext';

function Navbar() {
    const authContext = useContext(AuthContext);
    const foodContext = useContext(FoodContext);

    const{ isAuthenticated, logout, user} = authContext;
    const { clearFoods } = foodContext;
    const onLogout = () =>{
        logout();
        clearFoods();
    }
    const authLinks =(
        <Fragment>
            <li className = "nav-link ml-auto">Hello {user && user.name }</li>
            <li className = "nav-item">
                <a className = "nav-link text-dark" onClick= {onLogout} href ="#!">
                    Logout
                </a>
            </li>
            <li>
            <Link to = '/stats' className = "nav-link text-dark">Stats</Link>
            </li>
        </Fragment>
    )
    const guestLinks =(
        <Fragment>
                <li className = "nav-item ml-auto">
                    <Link to ='/register' className = " nav-link text-dark">Register</Link>
                </li>
                <li className = "nav-item">
                    <Link to ='/login' className = " nav-link text-dark">Login</Link>
                </li>
        </Fragment>
    )

    return (
        <nav className="nav  navbar-light bg-info justify-content-right">
            <li className = "nav-item">
            <Link to = '/' className = " nav-link text-dark">Carb<strong>Trak</strong></Link>
            </li>

            {isAuthenticated ? authLinks : guestLinks}
            <li>
            
            <Link to = '/about' className = "nav-link text-dark">About</Link>
            </li>
        </nav>
    )
}

export default Navbar
