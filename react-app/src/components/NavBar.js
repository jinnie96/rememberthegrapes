
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { login } from "../store/session"
import { useDispatch, useSelector } from 'react-redux';
import './NavBar.css'

const NavBar = () => {
  const dispatch = useDispatch()
  const demoLogin = async (e) => {
    e.preventDefault()
    await dispatch(login("demo@aa.io", "password"))
}

const user = useSelector(state => state.session.user)

// const onLogin = async (e) => {
//   e.preventDefault();
//   const data = await dispatch(login(email, password));
//   if (data) {
//     setErrors(data);
//   }
// };



  return (
    <nav>
      <ul class="navbar">
        {/* <li> */}
          <NavLink to='/' exact={true} activeClassName='active'>
            <i id = "homeBtn" className="fas fa-home i-img fa-2x"></i>
          </NavLink>
        {/* </li> */}
        {!user && (
          <div>
            <li>
              <NavLink to='/login' exact={true} activeClassName='active'>
                Login
              </NavLink>
            </li>
          <li>
            <NavLink to='/sign-up' exact={true} activeClassName='active'>
              Sign Up
            </NavLink>
          </li>
          </div>

        )}
        <div class="searchBar">
        <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Search" />
        </div>
        {/* <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
          Users
          </NavLink>
        </li> */}
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
