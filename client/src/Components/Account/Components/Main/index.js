import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import Upload from './Components/Upload/index'
import Friends from './Components/Friends/index'
import AddFriend from './Components/AddFriend/index'
import AccountInfo from './Components/AccountInfo/index'
import './index.css'


class Main extends Component {

    constructor(props){
        super(props)
    }
    render() {
        return <div className = "container-main">
                    <Route exact path = "/account">
                        <AccountInfo profile = {this.props.profile}/>
                    </Route>
                    <Route exact path = "/account/createchat">

                    </Route>
                    <Route exact path = "/account/add">
                        <AddFriend friends = {this.props.friends} account = {this.props.account} add = {this.props.add}/>
                    </Route>
                    <Route exact path = "/account/friends">
                        <Friends profile = {this.props.profile} add = {this.props.add} friends = {this.props.friends} account = {this.props.account}/>
                    </Route>
                    <Route exact path = "/account/mychats">
                        
                    </Route>
                    <Route exact path = "/account/upload">
                        <Upload account = {this.props.account}/>
                    </Route>
               </div>
    }
}

export default Main;