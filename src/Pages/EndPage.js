import React from 'react';
import { useLocation } from 'react-router-dom';
import { Topbar } from '../Components/Topbar/Topbar';
import './page.css';


export const EndPage = (props) => {

    // get user id from previous page
    const location = useLocation();
    const { id } = location.state;

    return(
        <>
            <Topbar id={id} currentState={6}/>
            <div className='page'>
                <div>
                    Thank you
                </div>
                <div className='footer'/>
            </div>
        </>
    )
}