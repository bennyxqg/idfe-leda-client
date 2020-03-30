import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
//import { Provider } from 'react-redux';
import './assets/css/base.less'
import Router from './router'
//import store from './store'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <ConfigProvider locale={zhCN}>
        <Router />
    </ConfigProvider>
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
