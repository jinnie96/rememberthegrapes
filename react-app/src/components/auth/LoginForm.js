import React, { useState, useHistory } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css'
const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  // const history = useHistory()

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    await dispatch(login("demo@aa.io", "password"))
    // history.push('./app')
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }



  return (
    <div className="signup">
    <div className="leftSide">
      <div className="logo">
        <a href="/">
        <img id ="logoPic" src="https://i.ibb.co/FHqpBL1/remember-the-grapes-logos-preview-rev-1-removebg-preview-1.jpg"></img>
        </a>
        {/* <h1 id="topLogo">remember the grapes</h1> */}
      </div>
      <div className="imagesMiddle">
        {/* <div className="images">
          <img src="https://www.rememberthemilk.com/img/hp_person2@2x.png?1639486969"></img>
          <img src="https://www.rememberthemilk.com/img/hp_person3@2x.png?1639486969"></img>
          <img src="https://www.rememberthemilk.com/img/hp_person4@2x.png?1639486969"></img>
        </div><br></br> */}
        <div className="text">
          <h1 id="underImageText">Checking items off a to-do list doesn’t determine progress; focusing on your priorities is what counts.</h1>
          <h3 id="underImageTextQuoted">- Frank Sonnenberg</h3>
        </div>
      </div>
    </div>
    <div className="rightSide">
    <div className="loginBtn">
        <a href="/signup">
        <button id="logButton">Sign up for free</button>
        </a>
      </div>
    <form className="form" onSubmit={onLogin}>
    <h3 id="signupHeading">Been here before? Welcome back!</h3>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label htmlFor='email'></label>
        <input
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div>
        <label htmlFor='password'></label>
        <input
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
        />
        <div class="loginDemoBtn">

        <button id="submitBtn" type='submit'>Login</button>
          </div>
        <div class="loginDemoBtn">
        <NavLink to="/app" exact={true}>
          <button id="submitBtn"onClick={demoLogin}>Demo User</button>
        </NavLink>
        </div>
      </div>
    </form>
    </div>
    </div>
  );
};



export default LoginForm;
