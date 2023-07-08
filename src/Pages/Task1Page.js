import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Topbar } from '../Components/Topbar/Topbar';
import { Multichoice } from '../Components/Multichoice/Multichoice';
import tweet_data from '../Data/tweet_data.json';

import './page.css';


export const Task1Page = (props) => {

    const [currentPageNum, setCurrentPageNum] = useState(7);
    const [answer, setAnswer] = useState(Array(tweet_data.length).fill(['', '', '']));

    const inputHandler = (e) => {
        e.preventDefault();
        setIthAnswer(Number(e.target.name), 2, e.target.value);
    }

    function setIthAnswer (i, j, val) {
        setAnswer(prevAnswer => {
            const newAnswer = [...prevAnswer];
            newAnswer[i] = [...newAnswer[i]];
            newAnswer[i][j] = val;
            return newAnswer;
        });
    }

    function prev () {
        setCurrentPageNum(currentPageNum- 1);
    }

    function next () {
        setCurrentPageNum(currentPageNum + 1);
    }

    return(
        <>
            <Topbar/>
            <div className='page'>
                <div className='survey'>
                    {currentPageNum === 7 ?
                        <>
                            <div className='explaination'>
                                In task 1, your goal is to detect hate speech in the given tweets and provide annotations accordingly.
                                Please carefully read the instructions below to complete the annotations.
                            </div>
                            <div className='explainBox'>
                                <b>Annotation definitions:</b>
                                <br/>
                                <b> • &nbsp;Hate:</b> If a tweet exhibits hate speech, select this annotation. Hate speech refers to any language, gesture, or expression that promotes violence, discrimination, or hostility against individuals or groups based on attributes such as race, ethnicity, gender, religion, sexual orientation, or other protected characteristics. 
                                <br/>
                                <b> • &nbsp;Non-hate:</b> If a tweet does not contain hate speech, select this annotation. Tweets in this category should be free from any form of hate speech or offensive language.
                                <br/>
                                <b> • &nbsp;Noise:</b> If you are not confident in which label to assign, select this annotation. 
                            </div>
                            <div className='explaination'>
                                If you select the “Hate” annotation, you will be provided with an additional set of options to further categorize the type of hate expressed in the tweet. Please select the appropriate type of hate from the following options: 
                            </div>
                            <div className='explainBox'>
                                <b> • &nbsp;Grievance:</b> Frustration over a minority group's perceived privilege. 
                                <br/>
                                <b> • &nbsp;Incitement:</b> Implying some group or person is of lesser value than another.
                                <br/>
                                <b> • &nbsp;Irony:</b> Using sarcasm, humor, and satire to demean someone.
                                <br/>
                                <b> • &nbsp;Stereotypes:</b> Associating a group with negative attribute using euphemisms, circumlocution, or metaphorical language.
                                <br/>
                                <b> • &nbsp;Threats:</b> Making an indirect commitment to attack someone's body, well-being, reputation, liberty, etc.
                                <br/>
                                <b> • &nbsp;Other:</b> Other.
                            </div>
                            <div className='explaination'>
                                For each selected type of hate, please provide a brief explanation or reason why you believe the tweet falls into that specific category.
                            </div>
                        </>
                    : 
                        <>
                            <div className='explainBox'>
                                <b>Annotation definitions:</b>
                                <br/>
                                <b> • &nbsp;Hate:</b> If a tweet exhibits hate speech, select this annotation. Hate speech refers to any language, gesture, or expression that promotes violence, discrimination, or hostility against individuals or groups based on attributes such as race, ethnicity, gender, religion, sexual orientation, or other protected characteristics. 
                                <br/>
                                <b> • &nbsp;Non-hate:</b> If a tweet does not contain hate speech, select this annotation. Tweets in this category should be free from any form of hate speech or offensive language.
                                <br/>
                                <b> • &nbsp;Noise:</b> If you are not confident in which label to assign, select this annotation. 
                            </div>
                            <div className='questionsContainer'>
                                {
                                    tweet_data.map((data, index) => (
                                        <div className='questionBox' key={index}>
                                            <div className='question'>
                                            <b>{index + 1}. Tweet: "</b>{data.Tweet}<b>"</b>
                                            </div>
                                            <Multichoice key={index} val={answer[index][0]} setAnswer={(val) => setIthAnswer(index, 0, val)} labels={['Hate', 'Non-hate', 'Noise']}/>
                                            {answer[index][0] === 'Hate' ? 
                                                <div className='extraQuestionContainer'>
                                                    <div className='question'>
                                                        <b>{index + 1}-a.</b> Select the appropriate type of hate from the following options:
                                                    </div>
                                                    <Multichoice val={answer[index][1]} setAnswer={(val) => setIthAnswer(index, 1, val)} labels={['Grievance', 'Incitement', 'Inferiority', 'Irony', 'Stereotypes', 'Threats', 'Other']}/>
                                                    <div className='question'>
                                                        <b>{index + 1}-b.</b> Reason why it falls to selected category:
                                                    </div>
                                                    <input className='shortform' name={index} value={answer[index][2]} onChange={inputHandler}></input>
                                                </div>
                                                :
                                                null
                                            }
                                        </div>
                                    ))
                                }
                            </div>
                        </>
                    }        
                    <div className='buttonContainer'>
                        {currentPageNum === 7 ? <div/> : <button className='prevBtn' onClick={prev}>Prev</button>}
                        {currentPageNum === 8 ? <Link to='/task2' className='nextBtn'>Next</Link> : <button className='nextBtn' onClick={next}>Next</button>}
                    </div>
                </div>
                <div className='footer'/>
            </div>
        </>
    )
}