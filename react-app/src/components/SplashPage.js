import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './SplashPage.css'

const SplashPage = () => {
    return (
        <div className="splash">
            <div className="splashNavBar">
                <div className="navBarLogo">
                    Remember the Grapes
                </div>
                <div className="logSignUp">
                    <p>Log In</p>
                    <p>Sign Up</p>
                </div>
            </div>
            <div className="splashMiddle">
                <h2>Middle</h2>
            </div>
            <div className="splashLower">
            <h2>Lower</h2>
            </div>
        </div>
    )
}

export default SplashPage
