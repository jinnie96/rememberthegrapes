import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './SplashPage.css'

const SplashPage = () => {
    return (
        <div className="splash">
            {/* <div className="backgroundColor"> */}
                <div className="splashNavBar">
                    <div className="navBarLogo">
                        <img id = "logoId" src = "https://i.ibb.co/FHqpBL1/remember-the-grapes-logos-preview-rev-1-removebg-preview-1.jpg"></img>
                    </div>
                    <div className="logSignUp">
                    <NavLink to='/login' exact={true} activeClassName='active'>
                        <p id="splashLogin">Log In</p>
                    </NavLink>
                    <NavLink to='/signup' exact={true} activeClassName='active'>
                        <p id="splashSignUp">Sign up for free</p>
                    </NavLink>
                    </div>
                </div>
                <div className="splashMiddle">
                    <div className="smartApp">
                        <h1 id="smartAppBusy">The smart to-do app for busy people.</h1>
                        <NavLink to='/signup' exact={true} activeClassName='active'>
                            <button id="signUpFree">Sign Up Free</button>
                        </NavLink>
                    </div>
                    <div className="busyImg">
                        <img id ="busyPersonImg" src="https://i.ibb.co/wwW48c2/6876341-preview-removebg-preview-1.jpg"></img>
                    </div>
                {/* </div> */}
            </div>
            <div className="splashLower">
                <div className="links">
                    <h2 id="copyright">© 2022 Remember the Grapes</h2>
                    <div className="contacts">
                    <a href='https://github.com/jinnie96/rememberthegrapes' target="_blank" rel="noreferrer"><i id="github" class="fa-brands fa-github"></i></a>
                    <a href='https://www.linkedin.com/in/karandeep-singh-600852a8' target="_blank" rel="noreferrer"><i id="linkedin" class="fa-brands fa-linkedin"></i></a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SplashPage
