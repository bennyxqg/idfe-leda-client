import React from 'react';
import {HashRouter, Route, Switch, Redirect} from 'react-router-dom';
import Index from '../views/Index/index';
import List from '../views/List/list';
import Login from '../views/Login';
import Home from '../views/Home';

const routers = [
    {path: "/login", component: Login},
    {path: "/", component: Index},
    {path: "/list", component: List, auth: true},
    {path: "/home", component: Home},
]

class BasicRoute extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        let token = this.props.token
        return (
            <HashRouter>
                <Switch>
                    {
                        routers.map((item, index) => {
                            return <Route key={index} exact path={item.path}
                                render={props => (
                                    !item.auth ? (<item.component {...props} />) : (token ? <item.component {...props} /> : <Redirect to={{
                                        pathname: '/login',
                                        state: {
                                            from: props.location
                                        }
                                    }} />)
                                )}
                            />
                        })
                    } 
                </Switch>
            </HashRouter>
        )
    }
}


export default BasicRoute;