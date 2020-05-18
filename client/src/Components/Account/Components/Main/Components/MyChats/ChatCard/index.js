import React from 'react'
import { Skeleton, Switch, Card, Avatar, Button, Modal, message } from 'antd';
import {
    PlusOutlined,
    QuestionCircleTwoTone
  } from '@ant-design/icons';
 
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react';

const { Meta } = Card;
const { confirm } = Modal;

@observer class ChatCard extends React.Component{

    constructor(props){
        super(props)
    }

    clickHandler = (e)=>{
      this.props.chat.prevChat = this.props.chat.currentChat
       this.props.chat.currentChat = this.props.id
    }

    render(){
        return (
        <div onClick = {this.clickHandler}>
           <NavLink to = {"/account/mychats/"+this.props.id}><Card style = {{padding:"0px",marginTop:"10px"}} hoverable = {true}>
          <Meta
            style = {{padding:"0px"}}
            avatar={
              <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT9xSZpbUO8NaBiUbNg1e_fXKb6j0FGJBF-vUbZQwicBsrFutV5&usqp=CAU" />
            }
            title={this.props.username}
            description={'ID: '+this.props.id}
          />
            
        </Card></NavLink>
        </div>
    )
        }
}

export default ChatCard;