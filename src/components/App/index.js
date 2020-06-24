import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";

import Home from "../../pages/Home";
import Game from "../../pages/Game";
import Results from "../../pages/Results";

const App = () =>  {
    const [questions, setQuestions] = useState(null);
    const [actualQuestion, setActualQuestion] = useState(1);

    const actions = {
        setQuestions,
        setActualQuestion,
    };

    return (
        <div className="ui center aligned container" style={{ margin: '50px auto' }}>
            <div className="ui piled segment" style={{ paddingBottom: '40px', paddingTop: '40px' }}>
                <div className="column">
                    <Router>
                        <Switch>
                            <Route path="/game">
                                <Game
                                    questions={questions} 
                                    actualQuestion={actualQuestion}
                                    actions={actions} 
                                /> 
                            </Route>
                            <Route path="/results">
                                <Results
                                    questions={questions}
                                    actions={actions} 
                                />
                            </Route>
                            <Route path="/">
                                <Home />
                            </Route>
                        </Switch>
                    </Router>
                </div>
            </div>
        </div>
    )
};

export default App;