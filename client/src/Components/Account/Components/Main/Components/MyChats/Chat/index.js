import React, { Component } from 'react'
import './index.css'
import {Input,Button} from 'antd'
import MessageCard from './MessageCard/index'
import { observer } from 'mobx-react';
import io from 'socket.io-client';

const { TextArea } = Input;


@observer class Chat extends Component {

    constructor(props){
        super(props)
    }

    socket = io('http://localhost:3001')

    componentDidMount(){
        this.props.chat.getMessages()
        this.socket.emit('connection_room',{chat_id: this.props.chat.currentChat})
        
    }


    enterHandler = (value)=>{
        
        this.socket.emit('message',{body: this.props.chat.message, chat_id: this.props.chat.currentChat, id: this.props.chat.userID})
        
        this.props.chat.message = ''
    }

    changeHandler = (e)=>{
        this.props.chat.changeMessage(e.target.value)
    }

    render() {
        this.socket.on('reload',(data)=>{
            this.props.chat.allMessages = data.messages
         })
        var block =  document.getElementsByClassName("chat-area")
        block.scrollTop = block.scrollHeight
        return (
            <div className = "container-main__mychats__chat">
                <div className = "chat-area">
                    <div className = "message-area">
                        {
                            this.props.chat.allMessages.map((el,index)=>{
                                return <MessageCard body = {el.body} time = {el.time} username = {el.user.username} picture = {el.user.picture} key = {index}/>
                            })
                        }
                    </div>
                </div>
                <p></p>
                <div>
                <TextArea
                value = {this.props.chat.message}
                onChange = {this.changeHandler}
                placeholder="Введите сообщение"
                autoSize={{ minRows: 1, maxRows: 4 }}
                />
                <p></p>
                <Button onClick = {this.enterHandler}>Отправить</Button>
                </div>

            </div>
        )
    }
}

export default Chat;
