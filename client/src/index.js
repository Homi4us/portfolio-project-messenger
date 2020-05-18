import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import store from './store.js';
import 'antd/dist/antd.css';
import App from './App'
import { BrowserRouter, Route } from 'react-router-dom';
import cookie from 'react-cookies';
import axios from 'axios';

if(cookie.load('jwt_token') != undefined){
    axios.post('/users/checkToken',{},{
        headers: { Authorization: "Bearer " + cookie.load('jwt_token') }
    }).then((res)=>{
        if(res.status == 200){
            store.user.isAuthenticated = true;
        }
    }).catch((err)=>{
        store.user.isAuthenticated = false;
        cookie.remove('jwt_token');
    })
}


ReactDOM.render(
    <BrowserRouter>
        <App games = {store.games} chat = {store.chat} mychats = {store.mychats} createChat = {store.createChat} profile = {store.profile} friends = {store.friends} user = {store.user} account = {store.account} add = {store.add}/>
    </BrowserRouter>
    , document.getElementById('root'));
serviceWorker.unregister();
