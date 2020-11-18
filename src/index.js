import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { Provider } from 'react-redux';
import './assets/css/base.scss'
// import './assets/css/dsky-antd.scss'
import Router from './router'
import store from './store'
import * as serviceWorker from './serviceWorker';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');



console.log('--buildTime--', process.env.buildTime)
// console.log('--publicPath--', process.env.publicPath)
// setTimeout(() => {
//     const siteIcon = document.querySelector('#site_icon')
//     if(siteIcon) {
//         siteIcon.href = process.env.publicPath + '/logo.ico'
//     }
// }, 2000);


ReactDOM.render(
    <Provider store={store}>
        <ConfigProvider locale={zhCN}>
            <Router />
        </ConfigProvider>
    </Provider>
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
