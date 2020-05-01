import React from 'react'
import { Skeleton, Switch, Card, Avatar, Button, Modal, message } from 'antd';
import './index.css'
import {
    PlusOutlined,
    QuestionCircleTwoTone
  } from '@ant-design/icons';

import store from '../../../../../../store'
import { observer } from 'mobx-react';

const { Meta } = Card;
const { confirm } = Modal;

@observer class UserCard extends React.Component{

    constructor(props){
        super(props)
    }

    clickHandler = (e)=>{
        var props = this.props
        var name = e.target.name
        confirm({
            title: `Действительно хотите добавить ${this.props.username} в друзья?`,
            icon: <QuestionCircleTwoTone />,
            content: 'После нажатия на ОК окно закроется через секунду',
            cancelText: 'Отменить',
            onOk() {
              props.add.addFriend(name,(status,mes)=>{
                if(status){
                    message.success(mes)
                    props.account.getData()
                } else {
                  message.error(mes)
                }
              })
            },
            onCancel() {},
          });
    }

    render(){
        return (
        <div>
            <Card style = {{padding:"0px",marginTop:"10px"}} hoverable = {true}>
          <Meta
            style = {{padding:"0px"}}
            avatar={
              <Avatar shape = "square" src={this.props.avatar} />
            }
            title={this.props.username}
            description="Рекомендация"
          />
            {(this.props.account.friendsList.indexOf(this.props.id) == -1)
            ?
            <Button  onClick = {this.clickHandler} name = {this.props.id} style = {{float:"right"}}>Добавить</Button>
            :
            <h4 style = {{float:"right",color:"green"}}>Ваш друг</h4>
            
            }
            
        </Card>
        </div>
    )
        }
}

export default UserCard;