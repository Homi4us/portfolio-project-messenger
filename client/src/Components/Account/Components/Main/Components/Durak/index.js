import React, { Component } from 'react'
import {Row, Col, Badge, Button, Progress, Table, Tag, Divider} from 'antd'
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
    constructor(props){
        super(props)
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
    render(){
       return   <Col span={24}>
                    <Row justify="start">{this.getStatus()}</Row>
                    <Col>
                        <Row justify="center" gutter={16}>
                                <Progress type="circle" percent="65" format={(percent) => `${percent}/100 EXP`} status="active"/>
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
