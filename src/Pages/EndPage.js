import React, {useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Topbar } from '../Components/Topbar/Topbar';
import './page.css';


export const EndPage = (props) => {

    // get user id from previous page
    const location = useLocation();
    const history = window.history;

    const { id } = location.state;

    // prevent back button
    useEffect(() => {
        const preventGoBack = () => {
            history.pushState(history.state, null, location.href);
        }
        history.pushState(history.state, null, location.href);
        window.addEventListener('popstate', preventGoBack)

        return() => {
            window.removeEventListener('popstate', preventGoBack)
        }

    }, [])

    return(
        <>
            <Topbar id={id} currentState={7}/>
            <div className='page'>
                <div>
                    <b>Thank you for participating our study.</b>
                    <br/>
                    <br/>
                    Copy and paste the following <b>completion code</b> in Prolific page.
                    <br/>
                    <br/>
                    <br/>
                    Completion code : <a style={{color: "#0481FF"}}><b>C17IMDUM</b></a>
                </div>
                <div className='footer'/>
            </div>
        </>
    )
}