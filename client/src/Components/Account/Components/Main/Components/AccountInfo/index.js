import React, { Component } from 'react'
import { Divider, Result, Switch, Input, Tooltip, Button,message, Spin, Skeleton } from 'antd'
import { SmileOutlined, UserOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Route } from 'react-router-dom';
import './index.css'
import { observer } from 'mobx-react';

const { TextArea } = Input;

@observer class AccountInfo extends Component {

    constructor(props){
        super(props)
        this.state = {switched: false}
    }

    componentDidMount(){
        this.props.profile.getUserProfile()
    }

    switchHandler = (e)=>{
        this.setState({switched: e})
    }

    submitHandler = (e)=>{
        e.preventDefault()
        this.props.profile.setUserData()
        setTimeout(()=>{
            if(this.props.profile.setStatus){
                message.success(this.props.profile.setMessage)
            } else {
                message.error(this.props.profile.setMessage)
            }
        },1000)
    }

    formHandler = (e)=>{
        this.props.profile.changeHandler(e.target)
    }

    render() {
        return (
            <div className = "container-main__account-info">
                <div>
                    {
                        this.props.profile.isLoaded
                        ?
                            <div>
                                <Skeleton.Input size = "default" active/>
                                <p></p>
                                <Skeleton.Input size = "small" active/>
                            </div>
                        :
                            <div>
                                <h1>{this.props.profile.userFirstname + " " + this.props.profile.userLastname}</h1>
                                <p style = {{fontSize: "18px"}}>{this.props.profile.userStatus}</p>
                            </div>
                    }
                    <Divider/>
                </div>
                <div className = "container-main__account-info__data">
                {
                    this.state.switched
                    ?
                        <div>
                            <div>
                                <Spin spinning = {this.props.profile.formLoaded}>
                                <form onSubmit = {this.submitHandler} onChange = {this.formHandler}> 
                                <Input value = {this.props.profile.name} size="large" placeholder="Имя" prefix={<UserOutlined />} name = "firstname"/>
                                <p></p>
                                <Input value = {this.props.profile.lastname} size="large" placeholder="Фамилия" prefix={<UserOutlined />} name = "lastname"/>
                                <p></p>
                                <TextArea value = {this.props.profile.status} rows={4} placeholder = "Статус профиля" name = "status"/>
                                <p></p>
                                <Button type = "primary" htmlType>Сохранить</Button>
                                </form>
                                </Spin>
                            </div>
                            <Result
                            icon = {<SmileOutlined style = {{color:"transparent"}}/>}
                            extra={<Switch onChange={this.switchHandler} defaultChecked/>}/>
                        </div>
                    :
                    <Result
                    icon={<SmileOutlined />}
                    subTitle="Привет, это главная страница твоего профиля! Скоро здесь будет больше возможностей. Ну а пока, установи своё имя и статус, передвинув ползунок"
                    extra={<Switch onChange={this.switchHandler}/>}
                />
                }
                </div>
            </div>
        )
    }
}

export default AccountInfo;
