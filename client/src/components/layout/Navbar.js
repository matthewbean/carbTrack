import React, {Fragment, useContext } from 'react'
import { Link } from 'react-router-dom';
import AuthContext from '../../context/author/authContext';
import FoodContext from '../../context/food/foodContext';

function Navbar() {
    const authContext = useContext(AuthContext);
    const foodContext = useContext(FoodContext);

    const{ isAuthenticated, logout } = authContext;
    const { clearFoods } = foodContext;
    const onLogout = () =>{
        logout();
        clearFoods();
    }
    const authLinks =(
        <Fragment>


            <li>
            <Link to = '/stats' className = "nav-link text-dark">Stats</Link>
            </li>

            <li>
            <Link to = '/about' className = "nav-link text-dark">About</Link>
            </li>
            <li className = "nav-item ml-auto">
                <a className = "nav-link text-dark font-weight-bold" onClick= {onLogout} href ="/">
                Logout <i className ="fas fa-arrow-circle-right"></i>
                </a>
            </li>
        </Fragment>
    )
    const guestLinks =(
        <Fragment>
            <li>
            
            <Link to = '/about' className = "nav-link text-dark">About</Link>
            </li>
        </Fragment>
    )

    return (
        <nav className="nav  navbar-light bg-primary justify-content-right">
            <li className = "nav-item">
            <Link to = '/' className = " nav-link text-dark">Carb<strong>Trak</strong></Link>
            </li>


            {isAuthenticated ? authLinks : guestLinks}

        </nav>
    )
}

export default Navbar

