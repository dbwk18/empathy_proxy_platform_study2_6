import React, { useState, useEffect } from 'react';
import './multichoice.css'


export const Multichoice = (props) => {

    const [val, setVal] = useState(null);

    useEffect(() => {
        setVal(props.val);
    }, []);

    function isClicked (val) {
        setVal(val);
        props.setAnswer(val);
    }

    return(
        <div className='multichoice'>
            {
                props.labels.map((label, index) => (
                    <React.Fragment key={index}>
                        <button className= {val === label ? 'clicked' : null} onClick={() => isClicked(label)}>{label}</button>
                    </React.Fragment>
                ))
            }
        </div>
    )
}