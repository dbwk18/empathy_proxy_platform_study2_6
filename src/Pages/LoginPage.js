import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './page.css';


export const LoginPage = (props) => {

    const [id, setId] = useState('');

    const inputHandler = (e) => {
        e.preventDefault();
        setId(e.target.value);
    }

    return(
        <div className='page'>
            <div className='loginContainer'>
                <div className='title'>
                    User ID
                </div>
                <input onChange={inputHandler}></input>
                <Link to={id === '' ? '' : '/intro'} state={{id: id}} className='loginBtn'>Login</Link>
            </div>
            <div className='loginDescription'>
                This interface is suitable for desktop.
            </div>
            <div className='footer'/>
        </div>
    )
}