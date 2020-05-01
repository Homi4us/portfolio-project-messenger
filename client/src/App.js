import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import AuthForm from './Components/AuthForm/index'
import Account from './Components/Account/index'
import { observer } from 'mobx-react'

 const App = observer((props)=> {
    if(props.user.isAuthenticated){
        return(
            <Switch>
             <Route path = "/account">
                 <Account profile = {props.profile} friends = {props.friends} account = {props.account} add = {props.add}/>
             </Route>
             <Redirect to = "/account"/>
         </Switch>
        )
    }
    return(
        <Switch>
            <Route exact path = "/">
                <AuthForm user = {props.user}/>
            </Route>
            <Redirect to = "/"/>
        </Switch>
    )
}
 )


export default App;
