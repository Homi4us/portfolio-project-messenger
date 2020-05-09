import React, { Component } from 'react'
import { Skeleton, Switch, Card, Avatar, Button, Modal, message } from 'antd';
import {
  PlusOutlined,
  QuestionCircleTwoTone
} from '@ant-design/icons';


const { Meta } = Card;
const { confirm } = Modal;

class FriendsCard extends Component {

    constructor(props){
        super(props)
    }

    clickHandler = (e)=>{
        var props = this.props
        var name = e.target.name
        confirm({
            title: `Действительно хотите создать чат с ${this.props.username}?`,
            icon: <QuestionCircleTwoTone />,
            content: 'После нажатия на ОК окно закроется через секунду',
            cancelText: 'Отменить',
            onOk() {
                props.createChat.newChat(name,(status,mes)=>{
                if(status){
                    message.success(mes)
                    props.createChat.getUsersInChats()
                } else {
                  message.error(mes)
                }
              })
            },
            onCancel() {},
          });
    }

    render() {
        return (
            <div>
                 <div>
            <Card style = {{padding:"0px",marginTop:"10px"}} hoverable = {true}>
          <Meta
            style = {{padding:"0px"}}
            avatar={
              <Avatar shape = "square" src={this.props.avatar} />
            }
            title={this.props.username}
            description={this.props.status}
          />
           {
               (this.props.users.indexOf(this.props.id)) == -1
               ?
               <Button onClick = {this.clickHandler} name = {this.props.id} style = {{float:"right"}}>Создать чат</Button>
               :
               <h4 style = {{float:"right",color:"green"}}>Уже в чате</h4>
               
           }
        </Card>
        </div>
            </div>
        )
    }
}

export default FriendsCard;