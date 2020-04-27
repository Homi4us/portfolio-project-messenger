import React from 'react'
import './index.css'
import { Input, Button, Alert, Spin } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react';

@observer class AuthForm extends React.Component {

    constructor(props){
        super(props)

    }

    regHandler = ()=>{
        this.props.user.registration()
    }

    authHandler = ()=>{
        this.props.user.authorization()
    }

    changeHandler = (e)=>{
        this.props.user.changeHandler(e.target)
    }

    render(){
        return <div class = "container">
                <Spin tip = "Ждём ответа..." spinning = {this.props.user.disableForm}>
                <form onChange = {this.changeHandler}>
                <h1>Регистрация / Авторизация</h1>
                <div class = "container__inputs">
                    <Input value = {this.props.user.data.username} id = "input-username" name = "username" size="large" placeholder="Ваш логин" prefix={<UserOutlined />} />
                    <p></p>
                    <Input.Password value = {this.props.user.data.password} size="large" name = "password" placeholder="Пароль" prefix={<LockOutlined/>} />
                </div>
                <div class = "container__buttons">
                    <Button size = "medium" type = "primary" onClick = {this.authHandler}>
                        Войти
                    </Button>
                    <Button size = "medium" type = "primary" onClick = {this.regHandler}>
                        Регистрация
                    </Button>
                </div>
                </form>
                </Spin>
                <p></p>
                {this.props.user.messages.map((el,index)=>{
                    return <Alert type = {el.type} message = {el.message} key = {index} showIcon/>
                })}
            </div>
    }
}

export default AuthForm;
