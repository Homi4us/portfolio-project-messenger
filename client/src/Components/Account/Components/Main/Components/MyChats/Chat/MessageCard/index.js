import React, { Component } from 'react'
import './index.css'
import { Comment, Tooltip, Avatar } from 'antd';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';

export default class MessageCard extends Component {

    constructor(props){
        super(props)
    }

    componentDidMount(){

    }
    
    render() {
        return (
            <div>
                <Comment
                author={<p>{this.props.username}</p>}
                avatar={
                    <Avatar
                    src={this.props.picture}
                    alt={this.props.username}
                    />
                }
                content={
                    <p>
                        {this.props.body}
                    </p>
                }
                datetime={this.props.time}
                />
            </div>
        )
    }
}
