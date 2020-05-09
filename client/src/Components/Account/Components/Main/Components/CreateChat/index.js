import React, { Component } from 'react'
import './index.css'
import { Input, Button, Pagination } from 'antd';
import {
    SearchOutlined,
    LoadingOutlined 
  } from '@ant-design/icons';
  

import FriendsCard from './FriendCard/index'
import { observer } from 'mobx-react';

  const { Search } = Input;

@observer class CreateChat extends Component {

    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.createChat.getFriends()
        this.props.createChat.getUsersInChats()
    }

    handleSearch = (value)=>{
        this.props.createChat.getBySearch(value)
    }

    render() {
        return (
            <div className = "container-main__add">
                <div id = "add-input">
                    <Search size = "large" placeholder="Введите логин" onSearch={this.handleSearch} enterButton />
                </div>
                
                {this.props.createChat.isLoaded
                ?
                    this.props.createChat.message == ''
                    ?
                        this.props.createChat.list.map((el,index)=>{
                            return  <FriendsCard createChat = {this.props.createChat} users = {this.props.createChat.users} status = {el.status} friends = {this.props.friends} id = {el._id} avatar = {el.picture} username = {el.username} key = {index} />
                        })
                    :
                        <div className = "add-loader">
                            <h3>{this.props.createChat.message}</h3>
                        </div>
                
                :
                <div className = "add-loader">
                <LoadingOutlined />
                </div>
                }
                

            </div>
        )
    }
}

export default CreateChat;