import React, { Component } from 'react'
import './index.css'
import {Input,Button, Spin} from 'antd'
import MessageCard from './MessageCard/index'
import { observer } from 'mobx-react';
import {
    PlusOutlined,
    QuestionCircleTwoTone,
    LoadingOutlined
  } from '@ant-design/icons';
import io from 'socket.io-client';

const { TextArea } = Input;


@observer class Chat extends Component {

    constructor(props){
        super(props)
    }

    componentWillMount(){
        this.props.chat.Loaded = false
    }

    componentDidMount(){
        this.props.chat.getMessages()
        this.props.chat.socket.emit('connection_room',{chat_id: this.props.chat.currentChat, prev: this.props.chat.prevChat})
    }

    componentDidUpdate(){
        document.getElementById('chat').scrollTop = 99999999999999999999999999999999
        
    }


    enterHandler = (value)=>{
        
        this.props.chat.socket.emit('message',{body: this.props.chat.message, chat_id: this.props.chat.currentChat, id: this.props.chat.userID})
        this.props.chat.message = ''
    }

    changeHandler = (e)=>{
        this.props.chat.changeMessage(e.target.value)
    }

    render() {
        this.props.chat.socket.on('reload',(data)=>{
            this.props.chat.allMessages = data.messages
         })
        
        return (
            <div className = "container-main__mychats__chat">
                <div className = "chat-area" id = "chat">
                    {
                        this.props.chat.Loaded
                        ?
                            <div className = "message-area">
                            {
                                this.props.chat.allMessages.map((el,index)=>{
                                    if(this.props.chat.allMessages.length == index+1){
                                        return <MessageCard last = {true} body = {el.body} time = {el.time} username = {el.user.username} picture = {el.user.picture} key = {index}/>
                                    } else {
                                    return <MessageCard last = {false} body = {el.body} time = {el.time} username = {el.user.username} picture = {el.user.picture} key = {index}/>
                                    }
                                    
                                })
                                
                            }
                        </div>
                        :
                        <div className = "add-loader">
                        <LoadingOutlined />
                        </div>
                    }
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
