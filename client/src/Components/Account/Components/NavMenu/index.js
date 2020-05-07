import React, { Component } from 'react'
import { Menu, Button,Badge } from 'antd';
import {
    ZoomInOutlined,
    TeamOutlined,
    CommentOutlined,
    CloseOutlined,
    UserAddOutlined,
    PlayCircleOutlined
  } from '@ant-design/icons';
  import { NavLink } from 'react-router-dom';

class NavMenu extends Component {
  
  constructor(props){
    super(props)
  }

  selectHandler = (e)=>{
    switch(e.key){
      case 'exit':
        this.props.account.logout()
        
      break;
    }
  }

    render() {
        return <div className = "container-account__navmenu">
                    <Menu onSelect = {this.selectHandler} style = {{padding:"0px 10px"}} theme = "light" mode = "inline">
                    <Menu.Item key = "createchat"><ZoomInOutlined/><NavLink to ="/account/createchat">Создать чат</NavLink></Menu.Item>
                    <Menu.Item key = "add"><UserAddOutlined /><NavLink to ="/account/add">Добавить в друзья</NavLink></Menu.Item>
                    <Menu.Item key = "friends"><TeamOutlined /><NavLink to ="/account/friends">Мои друзья</NavLink></Menu.Item>
                    <Menu.Item key = "mychats"><CommentOutlined /><NavLink to ="/account/mychats">Мои чаты</NavLink></Menu.Item>
                    <Menu.Item key = "games"><PlayCircleOutlined/><NavLink to ="/account/games">Игры</NavLink></Menu.Item>
                    <Menu.Item key = "exit"><CloseOutlined />Выход</Menu.Item>
                    </Menu>
               </div>
        
    }
}

export default NavMenu;
