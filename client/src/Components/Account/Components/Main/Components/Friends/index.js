import React, { Component } from 'react'
import './index.css'
import { Divider } from 'antd';
import FriendCard from './FriendCard/index';

export default class Friends extends Component {
    render() {
        return (
            <div className = "container-main__friends">
                <div>
                <h2>Список ваших друзей:</h2>
                <Divider/>
                </div>
                <FriendCard username = "Homi4us" avatar = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/588px-Google_%22G%22_Logo.svg.png"/>
            </div>
        )
    }
}
