import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Topbar } from '../Components/Topbar/Topbar';
import { Multichoice } from '../Components/Multichoice/Multichoice';
import { Likertchoice } from '../Components/Likertchoice/Likertchoice';

import './page.css';


export const PostSurveyPage = (props) => {

    const [currentPageNum, setCurrentPageNum] = useState(11);
    const questions = [
        'How mentally demanding was the task?',
        'How physically demanding was the task?',
        'How hurried or rushed was the pace of the task?',
        'How successful were you in accomplishing what you were asked to do?',
        'How hard did you have to work to accomplish your level of performance?',
        'How insecure, discouraged, irritated, stressed, and annoyed were you?'
    ];

    const [answer, setAnswer] = useState(Array(9).fill(''));

    function setIthAnswer (i, val) {
        setAnswer(prevAnswer => {
            const newAnswer = [...prevAnswer];
            newAnswer[i] = val;
            return newAnswer;
        });
    }

    const inputHandler = (e) => {
        e.preventDefault();
        setIthAnswer(Number(e.target.name), e.target.value);
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
                <div className='explaination'>
                        {currentPageNum === 11 ?
                            <>blanck</>
                            :
                            <>
                                Rate the following questions. (7-point Likert scale; 1-Very Low, 7-Very High)
                            </>
                        }
                    </div>
                    {currentPageNum === 11 ?
                        <div className='questionsContainer'>
                            <div className='questionBox'>
                                <div className='question'>
                                    <b>1.</b> Did the given information affect your decision in annotation? 
                                </div>
                                <Multichoice val={answer[0]} setAnswer={(val) => setIthAnswer(0, val)} labels={['Strongly Affect', 'Affect', 'Not Affect', 'Strongly Not Affet']}/>
                                <div className='extraQuestionContainer'>
                                    <div className='question'>
                                        <b>1-a.</b> If it did, how does it affect your decision? If it did not, why did it not affect your decision?

                                    </div>
                                    <input className='shortform' name={1} value={answer[1]} onChange={inputHandler}/>
                            </div>
                            </div>
                            <div className='questionBox'>
                                <div className='question'>
                                    <b>2.</b> How much did the given information influence your decision?
                                </div>
                                <input className='shortform' name={2} value={answer[2]} onChange={inputHandler}/>
                            </div>
                        </div>
                        :
                        <div className='questionsContainer'>
                            {
                                questions.map((question, index) => (
                                    <div className= 'questionBox' key={question}>
                                        <div className='question'>
                                            {index+1}. {question}
                                        </div>
                                        <Likertchoice val={answer[index + 3]} id={index + 3} setAnswer={(val) => setIthAnswer(index + 3, val)} labels={['Very Low', 'Low', 'Little Low', 'Neutral', 'Little High', 'High', 'Very High']}/>
                                    </div>
                                ))
                            }           
                        </div>
                    }
                    <div className='buttonContainer'>
                        {currentPageNum === 11 ? <div/> : <button className='prevBtn' onClick={prev}>Prev</button>}
                        {currentPageNum === 12 ? <Link to='/' className='nextBtn'>Finish</Link> : <button className='nextBtn' onClick={next}>Next</button>}
                    </div>
                </div>
                <div className='footer'/>
            </div>
        </>
    )
}