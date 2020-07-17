import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import Login from '../views/Login';
import AuthRouter from './authRouter';
import Layout from '../views/layout'

class BasicRoute extends React.Component{
    render(){
        return (
            <HashRouter>
                <Switch>
                    <Route component={Login} exact path="/login" />
                    <AuthRouter path="/" component={Layout} />
                </Switch>
            </HashRouter>
        )
    }
}


export default BasicRoute;