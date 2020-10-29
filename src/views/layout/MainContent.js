import React from 'react';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from "@/views/Home";
import News from "@/views/News";
import Replys from "@/views/Replys";
import Messages from "@/views/Messages";
import NotFound from "@/views/error/404";
import Detail from "@/views/NewDetail";
import Basic from "@/views/Basic";
import CarouselGroup from "@/views/Carousel/Group";
import CarouselList from "@/views/Carousel/List";
import VideoList from "@/views/Video/List";
import AdminUser from "@/views/AdminConf/User";
import AdminSite from "@/views/AdminConf/Site";
import Template from "@/views/Template";
import Visualization from "@/views/Visualization";


const MainContent = ({ location }) => {
	return (
		<Switch>
      {/* {routes.map(ele => <Route render={(props) => <ele.component {...props}/>} key={ele.path} path={ele.path} />)} */}
      <Route path="/basic" component={Basic} key={'/basic'}/>
      <Route path="/home" component={Home} key={'/home'}/>
      <Route path="/new" component={News} key={'/new'}/>
      <Route path="/detail" component={Detail} key={'/detail'}/>
      <Route path="/reply" component={Replys} key={'/reply'}/>
      <Route path="/message" component={Messages} key={'/message'}/>
      {/* <Route path="/carousel">
        <Route path="list" component={CarouselList}/>
        <Route path="group" component={CarouselGroup}/>
      </Route> */}
      <Route path="/carousel/group" component={CarouselGroup}/>
      <Route path="/carousel/list" component={CarouselList}/>
      <Route path="/video/list" component={VideoList}/>
      <Route path="/template" component={Template}/>
      <Route path="/adminConf/user" component={AdminUser}/>
      <Route path="/adminConf/site" component={AdminSite}/>
      <Route path="/visualization" component={Visualization}/>
      <Route path="/404" component={NotFound} key={'/404'}/>
      <Redirect from="/" exact to="/basic" />
      <Redirect to="/404" />
    </Switch>
	);
};

export default withRouter(MainContent);