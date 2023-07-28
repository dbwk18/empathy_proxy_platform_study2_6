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
            <div className='loginHeader'>
                Write your <b>Prolific ID</b> below. <br/>
                The ID will be used for the purpose of confirming your participation payment in the survey.
            </div>
            <div className='loginContainer'>
                <div className='title'>
                    Prolific ID
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