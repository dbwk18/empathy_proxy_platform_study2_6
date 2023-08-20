import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Topbar } from '../Components/Topbar/Topbar';
import { Multichoice } from '../Components/Multichoice/Multichoice';
import { firebaseDB } from '../firebase';
import { ref, push, get } from "firebase/database";

import abortion_sample_1 from '../Data/Abortion/sample_abortion_200(1).json';
import abortion_sample_2 from '../Data/Abortion/sample_abortion_200(2).json';
import abortion_sample_3 from '../Data/Abortion/sample_abortion_200(3).json';
import abortion_sample_4 from '../Data/Abortion/sample_abortion_200(4).json';
import abortion_sample_5 from '../Data/Abortion/sample_abortion_200(5).json';
import abortion_sample_6 from '../Data/Abortion/sample_abortion_200(6).json';
import abortion_sample_7 from '../Data/Abortion/sample_abortion_200(7).json';
import abortion_sample_8 from '../Data/Abortion/sample_abortion_200(8).json';

import './page.css';


export const Task1Page = (props) => {

    // get user id from previous page
    const navigate = useNavigate();
    const location = useLocation();
    const history = window.history;

    const { id } = location.state;
    const [tweetData, setTweetData] = useState([]);

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
        // getUserNum();

        return() => {
            window.removeEventListener('popstate', preventGoBack);
            window.removeEventListener('beforeunload', preventRefresh);
        }
    }, []);

    // set the page number
    const [currentPageNum, setCurrentPageNum] = useState(7);
    const [answer, setAnswer] = useState([]);

    function checkAllAnswered (answer) {
        const isAllAnswer = answer.every(item => 
            item[0] !== '' 
            && (item[0] === 'Non-hate' ? (item[1] !== '') : true)
        );
        return isAllAnswer;
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
        return array;
    }

    const getUserNum = async () => {
        const userRef = ref(firebaseDB, 'users/' + id);
        await get(userRef).then((snapshot) => {
            if (snapshot.exists()) {
                const userNum = snapshot.val().user_num;
                if(userNum % 8 === 0) {
                    setTweetData(shuffleArray(abortion_sample_1));
                    setAnswer(Array(abortion_sample_1.length).fill(['', '']));
                }
                else if (userNum % 8 === 1) {
                    setTweetData(shuffleArray(abortion_sample_2));
                    setAnswer(Array(abortion_sample_2.length).fill(['', '']));
                }
                else if (userNum % 8 === 2) {
                    setTweetData(shuffleArray(abortion_sample_3));
                    setAnswer(Array(abortion_sample_3.length).fill(['', '']));
                }
                else if (userNum % 8 === 3) {
                    setTweetData(shuffleArray(abortion_sample_4));
                    setAnswer(Array(abortion_sample_4.length).fill(['', '']));
                }
                else if (userNum % 8 === 4) {
                    setTweetData(shuffleArray(abortion_sample_5));
                    setAnswer(Array(abortion_sample_5.length).fill(['', '']));
                }
                else if (userNum % 8 === 5) {
                    setTweetData(shuffleArray(abortion_sample_6));
                    setAnswer(Array(abortion_sample_6.length).fill(['', '']));
                }
                else if (userNum % 8 === 6) {
                    setTweetData(shuffleArray(abortion_sample_7));
                    setAnswer(Array(abortion_sample_7.length).fill(['', '']));
                }
                else {
                    setTweetData(shuffleArray(abortion_sample_8));
                    setAnswer(Array(abortion_sample_8.length).fill(['', '']));
                }
            } else {
                console.log("No data available");
            }
          }).catch((error) => {
            console.error(error);
        });
    }

    const writeUserData = async () => {
        // create a reference to the user's specific location in the database
        const userRef = ref(firebaseDB, 'users/' + id);
    
        const dataObject = {};
        for (let i = 0; i < answer.length; i++) {
            const tweetId = tweetData[i]['ID'].toString().padStart(4, '0');
            dataObject[`task1_answer_${tweetId}`] = answer[i];
        }

        await push(userRef, dataObject);
    }

    const clickLink = async () => {
        await writeUserData();
        navigate('/task2', { state: { id } });
    }

    function setIthAnswer (i, j, val) {
        setAnswer(prevAnswer => {
            const newAnswer = [...prevAnswer];
            newAnswer[i] = [...newAnswer[i]];
            newAnswer[i][j] = val;

             // clear sub question answer
             if (j==0) newAnswer[i][1] = "";
             
            return newAnswer;
        });
    }

    function prev () {
        setCurrentPageNum(currentPageNum- 1);
    }

    function next () {
        getUserNum();
        setCurrentPageNum(currentPageNum + 1);
    }


    return(
        <>
            <Topbar id={id} currentState={3}/>
            <div className='page'>
                <div className='survey'>
                    {currentPageNum === 7 ?
                        <>
                            <div className='explaination'>
                                In <b>task 1</b>, your goal is to detect <a style={{color: "#0481FF"}}><b>hate speech targeting the legalization of abortion</b></a> in the given tweets and provide annotations accordingly.
                                After each tweet, there will be a <a style={{color: "#0481FF"}}><b>set of cognitive information processing steps</b> generated by <b>AI</b></a>. 
                                There are three key steps in cognitive information processing: <i>perception</i>, <i>cognition</i>, and <i>action</i>.
                            </div>
                            <div className='explainBox'>
                                <b>Definition for each cognitive information processing step:</b>
                                <br/>
                                <b> • &nbsp;Perception:</b> extracting relevant information, perceiving tone, and sentiment
                                <br/>
                                <b> • &nbsp;Cognition:</b> understand and interpret its meaning (e.g., analysis, evaluation)
                                <br/>
                                <b> • &nbsp;Action:</b> formulate response or reply to corresponding tweet
                            </div>
                            <div className='explaination'>
                                Referring to the given information, annotate whether <a style={{color: "#0481FF"}}><b>initial tweet</b></a> contains hate speech or not in the given context. 
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
                                If you select the <b>“Non-hate”</b>, you will be provided with an option to check whether the tweet belongs to the case of <b>"Advocate"</b> of the legalization of abortion or not.
                            </div>
                        </>
                    : 
                        <>
                            <div className='explaination'>
                                Please classify the following <a style={{color: "#0481FF"}}><b>initial tweet</b></a> (not tweet reply) as hate speech or non-hate speech to the <b>people who support legalization of abortion</b> by referring to the information generated by AI.
                            </div>
                            <div className='explainBox'>
                                <b>Annotation definitions:</b>
                                <br/>
                                <b> • &nbsp;Hate:</b> If a tweet exhibits hate speech, select this annotation. Hate speech refers to any language, gesture, or expression that promotes violence, discrimination, or hostility against individuals or groups based on attributes such as race, ethnicity, gender, religion, sexual orientation, or other protected characteristics. 
                                <br/>
                                <b> • &nbsp;Non-hate:</b> If a tweet does not contain hate speech, select this annotation. Tweets in this category should be free from any form of hate speech or offensive language.
                            </div>
                            <div className='explainBox'>
                                <b>Definition for each cognitive information processing steps:</b>
                                <br/>
                                <b> • &nbsp;Perception:</b> process of extracting relevant information, perceiving tone, and sentiment. 
                                <br/>
                                <b> • &nbsp;Cognition:</b> process to understand and interpret its meaning (e.g., analysis, evaluation)
                                <br/>
                                <b> • &nbsp;Action:</b> formulate response or reply to corresponding tweet 
                            </div>
                            <div className='questionsContainer'>
                                {
                                    tweetData.map((data, index) => (
                                        <div className='questionBox' key={index}>
                                            <div className='question tweet'>
                                            <b>{index + 1}.</b> Classify the <b>original tweet</b> as hate or non-hate. <br/><br/> <b>Tweet: "</b><i>{data.Tweet}</i><b>"</b>
                                            </div>
                                            <div className='question reply'>
                                            <b>Perception: </b>{data.perception}
                                            </div>
                                            <div className='question reply'>
                                            <b>Cognition: </b>{data.cognition}
                                            </div>
                                            <div className='question reply'>
                                            <b>Action: "</b><i>{data.action}</i><b>"</b>
                                            </div>
                                            <Multichoice key={index} val={answer[index][0]} setAnswer={(val) => setIthAnswer(index, 0, val)} labels={['Hate', 'Non-hate']} id={id} tasknum={"task1"} qnum={`${index}-main`}/>

                                            {answer[index][0] === 'Non-hate' ? 
                                                <div className='extraQuestionContainer'>
                                                    <div className='question'>
                                                        <b>{index + 1}-a.</b> Do you think the tweet belongs to the case of <b>"Advocate"</b>?
                                                    </div>
                                                    <Multichoice val={answer[index][1]} setAnswer={(val) => setIthAnswer(index, 1, val)} labels={['Yes', 'No']} id={id} tasknum={"task1"} qnum={`${index}-sub`}/>
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