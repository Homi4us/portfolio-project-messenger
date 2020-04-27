import React, { Component } from 'react'
import { Skeleton, Switch, Card, Avatar, Button, Modal, message } from 'antd';

const { Meta } = Card;

class FriendCard extends Component {

    constructor(props){
        super(props)
    }

    render() {
        return (
            <div>
                 <div>
            <Card style = {{padding:"0px",marginTop:"10px"}} hoverable = {true}>
          <Meta
            style = {{padding:"0px"}}
            avatar={
              <Avatar shape = "square" src={this.props.avatar} />
            }
            title={this.props.username}
            description="Статус вашего друга"
          />
            
        </Card>
        </div>
            </div>
        )
    }
}

export default FriendCard;