import React, { useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Redirect } from "react-router-dom";

import config from "../../config";
import opendtdb from '../../api/opendtdb';
import Header from '../../components/Header';

import './Game.css';

const Game = ({ questions, actualQuestion, actions }) => {
    const loadData = async () => {
        return await opendtdb.get('/', {
            params: { 
                amount: config.TRIVIA_AMOUNT,
                category: config.TRIVIA_CATEGORY,
                difficulty: config.TRIVIA_LEVEL,
                type: config.TRIVIA_TYPE,
              } 
        }).then(response => actions.setQuestions(() => {
            return response.data.results.map(item => {
                 return {
                     ...item,
                     answer: null,
                 }
            })
         }));
     };
 
     useEffect(() =>{
         !questions && loadData();
     },);

    if (questions && actualQuestion === questions.length) {
        return <Redirect to={{ pathname: "/results" }} />
    };

     const handleAnswer = (question, answer) => {
        const updatedQuestions = questions.map(item => {
            if(item.question === question) {
                item.answer = answer;
            }
            return item;
        });
        actions.setQuestions(updatedQuestions);
        actions.setActualQuestion(actualQuestion + 1);
    };

    return (
        <div className="ui container">
            {questions && questions[actualQuestion] && (
                <>
                <Header text="TRIVIA CHALLENGE"/>
                <h3 className="ui grey header">{questions[actualQuestion].category}</h3>
                <div className="questions ui fluid card" style={{ padding: '15vh' }}>
                    <div className="item">
                        <div className="middle aligned content">
                            <h1 className="ui header">{ReactHtmlParser(questions[actualQuestion].question)}</h1>
                        </div>
                    </div>
                    <div className="extra content" style={{ marginTop: '20px' }}>
                        <p>{actualQuestion} of {questions.length}</p>
                    </div>
                </div>
                <div className="ui divider"></div>
                <div className="ui buttons">
                    <button className="big ui negative button" onClick={() => handleAnswer(questions[actualQuestion].question, 'False')}>FALSE</button>
                    <div className="or"></div>
                    <button className="big ui positive button" onClick={() => handleAnswer(questions[actualQuestion].question, 'True')}>TRUE</button>
                </div>
                </>
            )}
        </div>
    )
};

Game.defaultProps = {
    questions: [],
    actualQuestion: 1,
};

export default Game;