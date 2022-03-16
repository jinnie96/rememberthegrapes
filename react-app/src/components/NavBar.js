
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { login } from "../store/session"
import { useDispatch, useSelector } from 'react-redux';
import './NavBar.css'
import {searchInput} from "../store/tasks"

const NavBar = () => {
  const dispatch = useDispatch()
  const demoLogin = async (e) => {
    e.preventDefault()
    await dispatch(login("demo@aa.io", "password"))
}

const user = useSelector(state => state.session.user)
const input = document.getElementById("inputSearch")

console.log(searchInput)
// const onLogin = async (e) => {
//   e.preventDefault();
//   const data = await dispatch(login(email, password));
//   if (data) {
//     setErrors(data);
//   }
// };

const searchTerm = async(e) => {
  const data = await dispatch(searchInput(user.id, e.target.value))
  {console.log(data)}

}


  return (
    <nav>
      <ul class="navbar">
        <h1 id="welcome">{user.username}</h1>
        {/* <li> */}
        {/* </li> */}
        {!user && (
          <div>
            <li>
              <NavLink to='/login' exact={true} activeClassName='active'>
                Login
              </NavLink>
            </li>
          <li>
            <NavLink to='/signup' exact={true} activeClassName='active'>
              Sign Up
            </NavLink>
          </li>
          </div>

        )}
        <div class="searchBar">
        {/* <i className="fa-solid fa-magnifying-glass"></i> */}
          <input id="inputSearch" placeholder="Search..." type="text" onKeyDown = {e => {
            if (e.key === "Enter") {
              searchTerm(e)
            }
          }}>

          </input>
        </div>
        {/* <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
          Users
          </NavLink>
        </li> */}
        {/* <li> */}
          <LogoutButton />
        {/* </li> */}
      </ul>
    </nav>
  );
}

export default NavBar;
