import React, { Component } from 'react'
import './index.css'
import Data from './Components/Data/index'
import NavMenu from './Components/NavMenu/index'
import Main from './Components/Main/index'

class Account extends Component {

    constructor(props){
        super(props)
    }

    componentWillMount(){

    }

    render() {
        return <div className = "container-account">
                    <div>
                        <Data account = {this.props.account}/>
                        <NavMenu account = {this.props.account}/>
                    </div>
                    <div >
                        <Main chat = {this.props.chat} mychats = {this.props.mychats} createChat = {this.props.createChat} profile = {this.props.profile} friends = {this.props.friends} account = {this.props.account} add = {this.props.add}/>
                    </div>
            </div>
    }
}

export default Account;
