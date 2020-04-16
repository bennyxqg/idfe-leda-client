import React from 'react';
import { withRouter } from 'react-router';
import { Route, Redirect } from 'react-router-dom';

const AuthRouter = ({ component: Component, ...rest }) => {
	// const isLogged = localStorage.getItem('isLogin') === '1' ? true : false;
	// return <Route {...rest} render={props => (isLogged ? <Component {...props} /> : <Redirect to={{
	// 		pathname: '/login',
	// 		state: {
	// 				from: props.location
	// 		}
	// }} />)} />;

	return <Route {...rest} render={props => (<Component {...props} /> )} />;
};

export default withRouter(AuthRouter);
