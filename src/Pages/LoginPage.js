import React from 'react';
import { Link } from 'react-router-dom';
import './page.css';


export const LoginPage = (props) => {
    return(
        <div className='page'>
            <div className='loginContainer'>
                <div className='title'>
                    User ID
                </div>
                <input></input>
                <Link to='/intro' className='loginBtn'>Login</Link>
            </div>
            <div className='footer'/>
        </div>
    )
}