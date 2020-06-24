import React from 'react';
import { Link } from "react-router-dom";

import Header from '../../components/Header';
import Button from '../../components/Button';

import './Home.css';

const Home = () => {
    return (
        <>
            <Header text="WELCOME TO THE TRIVIA CHALLENGE" />
            <div className="ui fluid card" style={{ padding: '15vh' }}>
                <div className="item">
                    <div className="middle aligned content">
                        <h2 className="ui center aligned header">
                            You will be presented with 10 true or false questions
                        </h2>
                        <h2 className="ui center aligned red header huge">
                            Can you score 100%?
                        </h2>
                    </div>
                </div>
            </div>
            <Link to="/game">
                <Button text="BEGIN" arrow="right" />
            </Link>
        </>
    )
};

export default Home;