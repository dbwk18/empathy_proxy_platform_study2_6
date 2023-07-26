import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Topbar } from '../Components/Topbar/Topbar';
import { Multichoice } from '../Components/Multichoice/Multichoice';
import { firebaseDB } from '../firebase';
import { ref, push } from "firebase/database";

import tweet_data from '../Data/tweet_data.json';
import './page.css';


export const Task1Page = (props) => {

    // get user id from previous page
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = location.state;

    // prevent back & refresh button
    useEffect(() => {
        const preventGoBack = () => {
            history.pushState(history.state, null, location.href);
        }
        const preventRefresh = (e) => {
            e.preventDefault();
            e.returnValue = "";
        }

        history.pushState(history.state, null, location.href);
        window.addEventListener('popstate', preventGoBack);

        window.addEventListener("beforeunload", preventRefresh);

        return() => {
            window.removeEventListener('popstate', preventGoBack);
            window.removeEventListener('beforeunload', preventRefresh);
        }

    }, [])

    // set the page number
    const [currentPageNum, setCurrentPageNum] = useState(7);
    const [answer, setAnswer] = useState(Array(tweet_data.length).fill(['', '']));

    function checkAllAnswered (answer) {
        const isAllAnswer = answer.every(item => 
            item[0] !== '' 
            && (item[0] === 'Non-hate' ? (item[1] !== '') : true)
        );
        return isAllAnswer;
    }

    const writeUserData = async () => {
        // create a reference to the user's specific location in the database
        const userRef = ref(firebaseDB, 'users/' + id);
    
        const dataObject = {};
        for (let i = 0; i < answer.length; i++) {
            dataObject[`task1_answer_${i < 10 ? '0' + String(i + 1): i + 1}`] = answer[i];
        }

        await push(userRef, dataObject);
    }

    const clickLink = async () => {
        await writeUserData();
        navigate('/task2', { state: { id } });
    }

    const inputHandler = (e) => {
        e.preventDefault();
        setIthAnswer(Number(e.target.name), Number(e.target.id), e.target.value);
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

    const content = {
        "Grievance": "frustration over a minority group's perceived privilege.",
        "Incitement": "implicitly promoting known hate groups and ideologies (e.g. by flaunting in-group power).",
        "Inferiority": "implying some group or person is of lesser value than another.",
        "Irony": "using sarcasm, humor, and satire to demean someone.",
        "Stereotypes": "associating a group with negative attribute using euphemisms, circumlocution, or metaphorical language.",
        "Threats": "making an indirect commitment to attack someone's body, well-being, reputation, liberty, etc."
    }

    return(
        <>
            <Topbar id={id} currentState={3}/>
            <div className='page'>
                <div className='survey'>
                    {currentPageNum === 7 ?
                        <>
                            <div className='explaination'>
                                In <b>task 1</b>, your goal is to detect <b>hate speech targeting the feminist movement</b> in the given tweets and provide annotations accordingly.
                                Please carefully read the instructions below to complete the annotations.
                            </div>
                            <div className='explainBox'>
                                <b>Annotation definitions:</b>
                                <br/>
                                <b> • &nbsp;Hate:</b> If a tweet exhibits hate speech, select this annotation. Hate speech refers to any language, gesture, or expression that promotes violence, discrimination, or hostility against individuals or groups based on attributes such as race, ethnicity, gender, religion, sexual orientation, or other protected characteristics. 
                                <br/>
                                <b> • &nbsp;Non-hate:</b> If a tweet does not contain hate speech, select this annotation. Tweets in this category should be free from any form of hate speech or offensive language.
                            </div>
                            <div className='explaination'>
                                If you select the <b>“Non-hate”</b>, you will be provided with an option to check whether the tweet belongs to the case of <b>"Advocate"</b> of feminist movement or not.
                            </div>
                        </>
                    : 
                        <>
                            <div className='explaination'>
                                Please classify the following tweet as hate speech or non-hate speech to the <b>feminist movement</b>.
                            </div>
                            <div className='explainBox'>
                                <b>Annotation definitions:</b>
                                <br/>
                                <b> • &nbsp;Hate:</b> If a tweet exhibits hate speech, select this annotation. Hate speech refers to any language, gesture, or expression that promotes violence, discrimination, or hostility against individuals or groups based on attributes such as race, ethnicity, gender, religion, sexual orientation, or other protected characteristics. 
                                <br/>
                                <b> • &nbsp;Non-hate:</b> If a tweet does not contain hate speech, select this annotation. Tweets in this category should be free from any form of hate speech or offensive language.
                            </div>
                            <div className='questionsContainer'>
                                {
                                    tweet_data.map((data, index) => (
                                        <div className='questionBox' key={index}>
                                            <div className='question'>
                                            <b>{index + 1}. Tweet: "</b><i>{data.Tweet}</i><b>"</b>
                                            </div>
                                            <Multichoice key={index} val={answer[index][0]} setAnswer={(val) => setIthAnswer(index, 0, val)} labels={['Hate', 'Non-hate']} />

                                            {answer[index][0] === 'Non-hate' ? 
                                                <div className='extraQuestionContainer'>
                                                    <div className='question'>
                                                        <b>{index + 1}-a.</b> Do you think the tweet belongs to the case of <b>"Advocate"</b>?
                                                    </div>
                                                    <Multichoice val={answer[index][1]} setAnswer={(val) => setIthAnswer(index, 1, val)} labels={['Yes', 'No']} />
                                                </div>
                                                :
                                                null
                                            }

                                            {/* {answer[index][0] === 'Hate' ? 
                                                <div className='extraQuestionContainer'>
                                                    <div className='question'>
                                                        <b>{index + 1}-a.</b> Select the appropriate type of hate from the following options:
                                                    </div>
                                                    <Multichoice val={answer[index][1]} setAnswer={(val) => setIthAnswer(index, 1, val)} labels={['Grievance', 'Incitement', 'Inferiority', 'Irony', 'Stereotypes', 'Threats', 'Other']} content={content}/>
                                                    <div className='question'>
                                                        <b>{index + 1}-b.</b> Reason why it falls to selected category:
                                                    </div>
                                                    <input className='shortform' name={index} value={answer[index][2]} onChange={inputHandler}></input>
                                                </div>
                                                :
                                                null
                                            } */}

                                        </div>
                                    ))
                                }
                            </div>
                        </>
                    }        

                    {
                        currentPageNum === 8 &&
                        <div className='explaination'>
                            Please note that once you proceed to the <b>next</b> page, you will not be able to come back to <b>Task 1</b> section. 
                            Make sure to carefully review and complete all the answers on this page before proceeding.
                        </div>
                    }

                    <div className='buttonContainer'>
                        {currentPageNum === 7 ? <div/> : <button className='prevBtn' onClick={prev}>Prev</button>}
                        {currentPageNum === 8 ? 
                            ( checkAllAnswered(answer) ?
                                <button onClick={clickLink} className='nextBtn'>Next</button>
                                :
                                <button className='nextBtn disable'>Next</button>
                            )
                            : 
                            <button className='nextBtn' onClick={next}>Next</button>}
                    </div>
                </div>
                <div className='footer'/>
            </div>
        </>
    )
}