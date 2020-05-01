import React, { Component } from 'react'
import './index.css'
import { Divider } from 'antd';
import {
    SearchOutlined,
    LoadingOutlined 
  } from '@ant-design/icons';
import FriendCard from './FriendCard/index';
import { observer } from 'mobx-react';

@observer class Friends extends Component {

    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.friends.getFriends()
    }

    render() {
        return (
            <div className = "container-main__friends">
                <div>
                <h2>Список ваших друзей:</h2>
                <Divider/>
                </div>
                {this.props.friends.isLoaded
                ?
                    this.props.friends.message == ''
                    ?
                    this.props.friends.friends.map((el,index)=>{
                        return <FriendCard status = {el.status} friends = {this.props.friends} id = {el._id} avatar = {el.picture} username = {el.username} key = {index} />
                    })
                    :
                        <div className = "add-loader">
                            <h3>{this.props.friends.message}</h3>
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

export default Friends;
