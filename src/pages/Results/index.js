import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Redirect } from 'react-router-dom';

import Header from '../../components/Header';
import Button from '../../components/Button';

import './Results.css';

const Results = ({ questions, actions }) => {
    if (!questions) {
        return <Redirect to={{ pathname: "/" }} />
    }

    const correctAnswers = questions && questions
        .reduce(
            (acc, question) => question.correct_answer === question.answer ? acc + 1 : acc, 0
        );
    
    const resetGame = () => {
        actions.setQuestions(null);
        actions.setActualQuestion(1);
        return <Redirect to={{ pathname: "/" }} />
    };

    const renderQuestion = (question, index) => {
        const answerStyle = {
            type: question.correct_answer === question.answer ? 'positive' : 'negative',
            icon: question.correct_answer === question.answer ? 'plus' : 'minus',
        };

        return (
            <div className={`ui attached left aligned segment ${answerStyle.type} message`} key={index}>
                <p>
                    <i className={`${answerStyle.icon} icon`}></i> 
                    {ReactHtmlParser(question.question)}
                </p>
            </div>
        )
    };

    return (
        <div className="ui container">
            <Header text="TRIVIA CHALLENGE"/>
            <h1>You scored<br/>{correctAnswers} of {questions && questions.length}</h1>
            <div className="ui fluid card" style={{ padding: '5%' }}>
                <div className="content">
                    {questions && questions.map((question, index) => {
                        return renderQuestion(question, index);
                    })}
                </div>
            </div>
            <Button text="PLAY IT AGAIN?" arrow="left" handleClick={resetGame} />
        </div>
    )
};

Results.defaultProps = {
    questions: [],
    actions: {
        setQuestions: () => {},
        setActualQuestion: () => {},
    },
};

export default Results;