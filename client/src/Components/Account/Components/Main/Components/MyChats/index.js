import React, { Component } from 'react'
import { Divider } from 'antd'
import './index.css'
import { NavLink,Route } from 'react-router-dom';
import ChatList from './ChatList/index'
import Chat from './Chat/index'

class MyChats extends Component {

    constructor(props){
        super(props)
    }

    

    render() {
        return (
            <div className = "container-main__mychats">
                
                <Route exact path = '/account/mychats/:id' render = {()=>{return <Chat chat = {this.props.chat} mychats = {this.props.mychats}/>}}/>
                
                <Route exact path = '/account/mychats' render = {()=>{return <ChatList chat = {this.props.chat} mychats = {this.props.mychats}/>}}/>
                    
                
            </div>
        )
    }
}

export default MyChats;
