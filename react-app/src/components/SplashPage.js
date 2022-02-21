import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const SplashPage = () => {
    return (
        <div className="splash">
            <div className="splashNavBar">
                <div className="navBarLogo">
                    Remember the Grapes
                </div>
                <div className="LogSignUp">
                    <p>Log In</p>
                    <p>Sign Up</p>
                </div>
            </div>
            <div className="splashMiddle">

            </div>
            <div className="splashLower">

            </div>
        </div>
    )
}

export default SplashPage
