import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Topbar } from '../Components/Topbar/Topbar';
import { Multichoice } from '../Components/Multichoice/Multichoice';
import { Likertchoice } from '../Components/Likertchoice/Likertchoice';

import './page.css';


export const PostSurveyPage = (props) => {

    // get user id from previous page
    const location = useLocation();
    const { id } = location.state;

    // set the page number
    const [currentPageNum, setCurrentPageNum] = useState(11);
    const questions = [
        'How mentally demanding was the task?',
        'How physically demanding was the task?',
        'How hurried or rushed was the pace of the task?',
        'How successful were you in accomplishing what you were asked to do?',
        'How hard did you have to work to accomplish your level of performance?',
        'How insecure, discouraged, irritated, stressed, and annoyed were you?'
    ];

    const [answer, setAnswer] = useState(Array(10).fill(''));

    function checkAllAnswered (answer) {
        const isAllAnswer = answer.every(item => item !== '');
        return isAllAnswer;
    }

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
            <Topbar id={id} currentState={5}/>
            <div className='page'>
                <div className='survey'>
                <div className='explaination'>
                        {currentPageNum === 11 ?
                            <>
                                This is the post-survey about previous <b>task1</b> and <b>task2</b>.
                                We would like to gather more detailed information about your experience with the task.
                                Please take a moment to answer the following questions.
                            </>
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
                                    <b>1.</b> In general, did you think the given statements of perception, cognition, and action reflected your core values toward the (topic)?
                                </div>
                                <Multichoice val={answer[0]} setAnswer={(val) => setIthAnswer(0, val)} labels={['Strongly Reflected', 'Reflected', 'Not Reflected', 'Strongly Not Reflected']}/>
                                <div className='extraQuestionContainer'>
                                    <div className='question'>
                                        <b>1-a.</b> At what point did you think it reflected or not reflected your value?
                                    </div>
                                    <input className='shortform' name={1} value={answer[1]} onChange={inputHandler}/>
                                </div>
                            </div>
                            <div className='questionBox'>
                                <div className='question'>
                                    <b>2.</b> Do you think the given statements of perception, cognition, and action empathized with your situation as if you were seeing the given tweets? 
                                </div>
                                <Multichoice val={answer[2]} setAnswer={(val) => setIthAnswer(2, val)} labels={['Strongly Empathized', 'Empathized', 'Not Empathized', 'Strongly Not Empathized']}/>
                                <div className='extraQuestionContainer'>
                                    <div className='question'>
                                        <b>2-a.</b> At what point did you think it reflected or not reflected your value?
                                    </div>
                                    <input className='shortform' name={3} value={answer[3]} onChange={inputHandler}/>
                                </div>
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
                                        <Likertchoice val={answer[index + 4]} id={index + 4} setAnswer={(val) => setIthAnswer(index + 4, val)} labels={['Very Low', 'Low', 'Little Low', 'Neutral', 'Little High', 'High', 'Very High']}/>
                                    </div>
                                ))
                            }           
                        </div>
                    }
                    <div className='buttonContainer'>
                        {currentPageNum === 11 ? <div/> : <button className='prevBtn' onClick={prev}>Prev</button>}
                        {currentPageNum === 12 ? 
                            ( checkAllAnswered(answer) ?
                                <Link to='/end' state={{id: id}} className='nextBtn'>Finish</Link> 
                                :
                                <button className='nextBtn disable'>Finish</button>
                            )
                            : 
                            ( checkAllAnswered(answer.slice(0,4)) ?
                                <button className='nextBtn' onClick={next}>Next</button>
                                :
                                <button className='nextBtn disable'>Next</button>
                            )
                        }
                    </div>
                </div>
                <div className='footer'/>
            </div>
        </>
    )
}