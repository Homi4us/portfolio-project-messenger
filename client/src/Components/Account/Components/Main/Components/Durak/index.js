import React, { Component } from 'react'
import {Row, Col, Badge, Button, Progress, Table, Tag, Divider, Spin} from 'antd'
import {observer} from 'mobx-react'
import './index.css'

const columns = [
    {
      title: 'Ник игрока',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Уровень',
      dataIndex: 'lvl',
      key: 'lvl',
    },
    {
      title: 'Статус комнаты',
      key: 'status',
      dataIndex: 'status',
      render: tag => {
            let color = "ожидает" ? "red" : "green" 
              return <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
      },
    },
    {
      title: '',
      key: 'action',
      render: (text, record) => {
        if(!(record.status.indexOf("играет") > -1)){
            return <a>Сыграть с {record.name}</a>
          }
        return null
      },
    },
  ];


@observer class Durak extends Component {
  state = {preparing: true}
    constructor(props){
        super(props)
        this.rank = 1
        this.curr = 2
        this.percentRank = "0"
    }
    componentDidMount(){
        this.props.store.createConnection()
        this.props.store.getRate()
    }
    getStatus(){
        if(this.props.store.connected){
            return <Badge status="success" text="Сервер на связи"/>
        }
        return <Badge status="processing" text="Устанавливаем соедниение с сервером дураков"/>
    }
    createRoom = () => {
        this.props.store.socket.emit("create_room")
    }
    setRank = () =>{
      let curr = 2
      let rank = 1
      let winners = this.props.store.winners
      this.winrate = this.props.store.total > 0 ? Math.round((winners/this.props.store.total)*100).toString() : "0"
      while(winners >= curr){
        winners -= curr
        curr++
        rank++
      }
      this.rank = rank
      this.curr = curr
      this.percentRank = Math.round((winners/curr)*100).toString()
      if(this.state.preparing){
        this.setState({preparing: false})
      }
    }
    render(){
      this.setRank()
       return  <Col span={24}>
                    <Row justify="start">{this.getStatus()}</Row>
                    <Col>
                        <Row justify="space-around" gutter={16} align="middle">
                                <Col>
                                  <Progress  strokeColor={{'100%': '#108ee9','0%': '#ff4c5b'}} type="dashboard" percent={this.percentRank} format={(percent) => `${percent}/${this.curr}`}/>
                                </Col>
                                <Col>
                                  <Row justify="center" style={{fontSize: "30px"}}>Ранг {this.rank}</Row>
                                </Col>
                                <Col>
                                <Progress  strokeColor={{'100%': '#108ee9','0%': '#ff4c5b'}} type="dashboard" percent={this.winrate} format={(percent) => `${percent}%`}/>
                                </Col>
                        </Row>
                        <Row justify="center" gutter={16}>
                            <Button type="primary" onClick={this.createRoom}>Создать комнату</Button>
                        </Row>
                    </Col>
                    <Divider orientation="center">Список доступных комнат</Divider>
                    <Table columns={columns} dataSource={null}/>
                </Col>
              
    }
}

export default Durak;
