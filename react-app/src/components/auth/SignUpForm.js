import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('')
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    setErrors([])
    if (password != confirmPassword) {
      errors.push("Passwords must match")
    }
      const data = await dispatch(signUp(firstName, lastName, username, email, password, confirmPassword));
      if (data) {
        setErrors(data)
      }
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateSecondName = (e) => {
    setLastName(e.target.value);
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
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
        <div className="images">
          <img src="https://www.rememberthemilk.com/img/hp_person2@2x.png?1639486969"></img>
          <img src="https://www.rememberthemilk.com/img/hp_person3@2x.png?1639486969"></img>
          <img src="https://www.rememberthemilk.com/img/hp_person4@2x.png?1639486969"></img>
        </div><br></br>
        <div className="text">
          <h1 id="underImageText">Join millions of people getting more organized and productive!</h1>
        </div>
      </div>
    </div>
    <div className="rightSide">
      <div className="loginBtn">
        <a href="/login">
        <button id="logButton">Log in</button>
        </a>
      </div>
      <form className="form" onSubmit={onSignUp}>
      <h3 id="signupHeading">Sign up for free.</h3>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <label></label>
          <input
            type='text'
            placeholder="First Name"
            name='username'
            onChange={updateFirstName}
            value={firstName}
          ></input>
        </div>
        <div>
          <label></label>
          <input
            type='text'
            name='username'
            placeholder="Last Name"
            onChange={updateSecondName}
            value={lastName}
          ></input>
        </div>
        <div>
          <label></label>
          <input
            type='text'
            name='email'
            placeholder="Email"
            onChange={updateEmail}
            value={email}
          ></input>
        </div>
        <div>
          <label></label>
          <input
            type='text'
            name='username'
            placeholder="Username"
            onChange={updateUsername}
            value={username}
          ></input>
        </div>
        <div>
          <label></label>
          <input
            type='password'
            name='password'
            placeholder="Password"
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <div>
          <label></label>
          <input
            type='password'
            name='confirmPassword'
            placeholder="Confirm Password"
            onChange={updateConfirmPassword}
            value={confirmPassword}
          ></input>
        </div>

        <button id="submitBtn" type='submit'>Sign Up!</button>
      </form>

    </div>

    </div>
);
};

export default SignUpForm;

{/* <div className="signup">
<div className="leftSide">
  <div className="logo">
    <h1 id="topLogo">remember the grapes</h1>
  </div>
  <div className="imagesMiddle">
    <img src="https://www.rememberthemilk.com/img/hp_person2@2x.png?1639486969"></img>
    <img src="https://www.rememberthemilk.com/img/hp_person3@2x.png?1639486969"></img>
    <img src="https://www.rememberthemilk.com/img/hp_person4@2x.png?1639486969"></img>
  </div>
</div>
<div className="rightSide">
  <form className="form" onSubmit={onSignUp}>
    <div>
      {errors.map((error, ind) => (
        <div key={ind}>{error}</div>
      ))}
    </div>
    <div>
      <label>First Name</label>
      <input
        type='text'
        name='username'
        onChange={updateFirstName}
        value={firstName}
      ></input>
    </div>
    <div>
      <label>Last Name</label>
      <input
        type='text'
        name='username'
        onChange={updateSecondName}
        value={lastName}
      ></input>
    </div>
    <div>
      <label>Email</label>
      <input
        type='text'
        name='email'
        onChange={updateEmail}
        value={email}
      ></input>
    </div>
    <div>
      <label>User Name</label>
      <input
        type='text'
        name='username'
        onChange={updateUsername}
        value={username}
      ></input>
    </div>
    <div>
      <label>Password</label>
      <input
        type='password'
        name='password'
        onChange={updatePassword}
        value={password}
      ></input>
    </div>
    <div>
      <label>Confirm Password</label>
      <input
        type='password'
        name='confirmPassword'
        onChange={updateConfirmPassword}
        value={confirmPassword}
      ></input>
    </div>

    <button type='submit'>Sign Up</button>
  </form>

</div>

</div> */}
