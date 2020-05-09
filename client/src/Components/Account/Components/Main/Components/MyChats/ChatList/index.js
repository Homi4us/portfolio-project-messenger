import React, { Component } from 'react'
import { Divider } from 'antd'
import ChatCard from '../ChatCard/index'
import './index.css'
import {
    PlusOutlined,
    QuestionCircleTwoTone,
    LoadingOutlined
  } from '@ant-design/icons';
import { observer } from 'mobx-react';


@observer class MyChats extends Component {

    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.mychats.getChats()
    }

    render() {
        return (
            <div>
                <div >
                <h2>Список ваших чатов:</h2>
                <Divider/>
                </div>
                <div>
                {this.props.mychats.Loaded
                ?
                    this.props.mychats.message == ''
                    ?
                        this.props.mychats.chats.map((el,index)=>{
                            var name = [];
                            el.members.map((elem)=>{
                                if(elem._id.username != this.props.mychats.username){
                                    console.log(elem._id.username+ ' / ' + this.props.mychats.username)
                                    name.push(elem._id.username)
                                }
                            })
                            return <ChatCard chat = {this.props.chat} id = {el._id} username = {'Чат с '+ name[0]} key = {index} />
                        })
                    :
                        <div className = "add-loader">
                            <h3>{this.props.mychats.message}</h3>
                        </div>
                
                :
                <div className = "add-loader">
                <LoadingOutlined />
                </div>
                }
                </div>
            </div>
        )
    }
}

export default MyChats;
