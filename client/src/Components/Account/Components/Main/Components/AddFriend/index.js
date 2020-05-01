import React, { Component } from 'react'
import './index.css'
import { Input, Button, Pagination } from 'antd';
import {
    SearchOutlined,
    LoadingOutlined 
  } from '@ant-design/icons';
  

import UserCard from '../UserCard/index'
import { observer } from 'mobx-react';

  const { Search } = Input;

@observer class AddFriend extends Component {

    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.add.getRecommendations()
    }

    handleSearch = (value)=>{
        this.props.add.getBySearch(value)
    }

    render() {
        return (
            <div className = "container-main__add">
                <div id = "add-input">
                    <Search size = "large" placeholder="Введите логин" onSearch={this.handleSearch} enterButton />
                </div>
                {this.props.add.isLoadedRecommend
                ?
                    this.props.add.message == ''
                    ?
                        this.props.add.list.map((el,index)=>{
                            return <UserCard friends = {this.props.friends} account = {this.props.account} add = {this.props.add} id = {el._id} avatar = {el.picture} username = {el.username} key = {index} />
                        })
                    :
                        <div className = "add-loader">
                            <h3>{this.props.add.message}</h3>
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

export default AddFriend;