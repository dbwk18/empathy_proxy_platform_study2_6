import React, { useState, useEffect } from 'react';
import './multichoice.css'
import { Tooltip } from '../Tooltip/Tooltip';


export const Multichoice = (props) => {

    const [val, setVal] = useState(null);
    const [hover, setHover]= useState(null);
    const [xpos, setXpos] = useState(0);
    const [ypos, setYpos] = useState(0);

    useEffect(() => {
        setVal(props.val);
    }, []);

    function isClicked (val) {
        setVal(val);
        props.setAnswer(val);
    }

    function isHovered (e, val) {
        setHover(val);
        setXpos(e.target.offsetLeft);
        setYpos(e.target.offsetTop + 40);
    }

    return(
        <div className='multichoice'>
            {
                props.labels.map((label, index) => (
                    <React.Fragment key={index}>
                        <button className= {val === label ? 'clicked' : null} onClick={() => isClicked(label)}  onMouseOver={(e)=> isHovered(e, label)} onMouseLeave={(e) => isHovered(e, null)}>{label}</button>
                        <Tooltip label={label} hover={hover} xpos={xpos} ypos={ypos} content={props.content}/>
                    </React.Fragment>
                ))
            }
        </div>
    )
}