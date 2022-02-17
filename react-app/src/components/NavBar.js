
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { login } from "../store/session"
import { useDispatch } from 'react-redux';

const NavBar = () => {
  const dispatch = useDispatch()
  const demoLogin = async (e) => {
    e.preventDefault()
    await dispatch(login("demo@aa.io", "password"))
}

// const onLogin = async (e) => {
//   e.preventDefault();
//   const data = await dispatch(login(email, password));
//   if (data) {
//     setErrors(data);
//   }
// };



  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
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
        <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
