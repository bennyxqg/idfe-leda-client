import React from 'react';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { routes } from '@/router/router';

const MainContent = ({ location }) => {
	return (
		<Switch>
      {routes.map(ele => <Route render={(props) => <ele.component {...props}/>} key={ele.path} path={ele.path} />)}
      <Redirect from="/" exact to="/home" />
      <Redirect to="/404" />
    </Switch>
	);
};

export default withRouter(MainContent);