import React, { Component } from 'react'
import { Skeleton, Switch, Card, Avatar, Button, Modal, message } from 'antd';
import {
  PlusOutlined,
  QuestionCircleTwoTone
} from '@ant-design/icons';
import f from 'session-file-store';

const { Meta } = Card;
const { confirm } = Modal;

class FriendCard extends Component {

    constructor(props){
        super(props)
    }

    clickHandler = (e)=>{
      var props = this.props
      var name = e.target.name
      confirm({
          title: `Действительно хотите удалить ${this.props.username} из друзей?`,
          icon: <QuestionCircleTwoTone />,
          content: 'После нажатия на ОК окно закроется через секунду',
          cancelText: 'Отменить',
          onOk() {
            props.friends.deleteFriend(name,(status,mes)=>{
              if(status){
                message.success(mes)
                props.friends.getFriends()
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
            <Button onClick = {this.clickHandler} name = {this.props.id} style = {{float:"right"}} danger>Удалить</Button>
        </Card>
        </div>
            </div>
        )
    }
}

export default FriendCard;