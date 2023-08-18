import React, { useState, useEffect } from 'react';
import './multichoice.css'
import { Tooltip } from '../Tooltip/Tooltip';
import { firebaseDB } from '../../firebase';
import { ref, set, get, push } from "firebase/database";


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
        createLog();
    }

    function isHovered (e, val) {
        setHover(val);
        setXpos(e.target.offsetLeft);
        setYpos(e.target.offsetTop + 40);
    }

    async function createLog () {
        if (props.tasknum) {
            const dataObject = {}
            const logRef = ref(firebaseDB, 'log/' + props.id + '/' + props.tasknum);

            dataObject[props.qnum] = new Date().toISOString();
            await push(logRef, dataObject);
        }
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