import React from 'react';
import Likert from 'react-likert-scale';
import './likertchoice.css'


export const Likertchoice = (props) => {

    const likertOptions = {
        id: props.id,
        responses: props.labels.map(label => {
            return {
                value: label,
                text: label,
                ...(label === props.val && { checked: true })
            };
        }),
        onChange: val => {
            props.setAnswer(val.value);
        }
    };

    return(
        <Likert {...likertOptions}/>
    )
}