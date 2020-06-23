import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './Home';
import Join from './Join';

const Routes = () => (
    <Router>
        <Switch>
            <Route exact path="/zoom-sample" component={Home} />
            <Route exact path="/zoom-sample/join" component={Join} />
        </Switch>
    </Router>
);

export default Routes;