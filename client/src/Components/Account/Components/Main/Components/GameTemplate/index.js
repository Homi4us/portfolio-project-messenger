import React, { Component } from 'react'
import {Row, Spin, Col} from "antd"
import gameList from '../../../../../games'
import Durak from './../Durak'
import './index.css'
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

class GameTemplate extends Component {
    state = {isLoading: 1}
    constructor(props){
        super(props)
        this.game = gameList.filter((item) => {return item.endpoint == this.props.match.params.game}).pop()
    }
    render(){
        let component
        switch(this.game.endpoint){
            case "durak":
                component = <Durak/>
                break;
            case "durak":
                component = <Durak/>
                break;
            default:
                component = <div>Игра не найдена :(</div>
                break;
        }
        return (
        <Col>
            <Row>
                <h2>{this.game.title}</h2>
            </Row>
                <Row justify="center">
                    {this.state.isLoading ? <Spin style={{marginTop:"10%"}} indicator={antIcon}/> : component}
                </Row>
        </Col>
        )
    }
}

export default GameTemplate;
