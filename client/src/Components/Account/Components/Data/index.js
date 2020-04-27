import React, { Component } from 'react'
import './index.css'
import { Upload, Skeleton, Spin, Badge} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react';



@observer class Data extends Component {

    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.account.getData()
    }

    render() {
        return <div class = "container-account__data">
                <Spin spinning = {!this.props.account.isLoaded}>
                
                    <div className = "container-account__data__image">
                        <NavLink to = '/account/upload'><img id = "profile_picture" src = {this.props.account.picture} alt = "you picture"/>
                        </NavLink>
                    </div>
                    
                    </Spin>
                    <div className = "container-account__data__login">
                    { this.props.account.isLoaded
                    ?
                    <h3>Логин: {this.props.account.username}</h3>
                    : 
                    <Skeleton.Input size = "small"  active/>
                        }
                    </div>
                
            </div>
    }
}

export default Data;