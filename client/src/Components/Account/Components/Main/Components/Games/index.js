import React, { Component } from 'react'
import {Row, Card, Col} from "antd"
import {Redirect} from "react-router-dom"
import './index.css'

const { Meta } = Card


class Games extends Component {
    state = {redirect: null}
    constructor(props){
        super(props)
    }
    render(){
        if(this.state.redirect) return <Redirect to={`games/${this.state.redirect}`}/>
        let cards = this.props.games.map(game => {
                return (<Card hoverable style={{width: "150px", margin: "10px"}} onClick={() =>{this.setState({redirect: game.endpoint})} } cover={<img style={{height:'150px'}} alt="some game" src={game.image}/>}>
                    <Meta title={game.title} description={game.description}/>
                </Card>)
            })
        return (
            <Row>
                <Col>
                    <Row>
                        <h2>Игры</h2>
                    </Row>
                    <Row>
                        {cards}
                    </Row>
                </Col>
            </Row>
        )
    }
}

export default Games;
