import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import Upload from './Components/Upload/index'
import Friends from './Components/Friends/index'
import AddFriend from './Components/AddFriend/index'
import './index.css'


class Main extends Component {

    constructor(props){
        super(props)
    }
    render() {
        return <div className = "container-main">
                    <Route exact path = "/account/createchat">

                    </Route>
                    <Route exact path = "/account/add">
                        <AddFriend account = {this.props.account} add = {this.props.add}/>
                    </Route>
                    <Route exact path = "/account/friends">
                        <Friends account = {this.props.account}/>
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
