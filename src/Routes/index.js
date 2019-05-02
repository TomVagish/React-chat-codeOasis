import React from 'react';
import {BrowserRouter, Route ,Switch} from 'react-router-dom'

import App from '../App';
import Chat from '../Components/Chat';


export default () => 
  (
    <BrowserRouter>
    <Switch>
     
    <Route path="/" component={App} exact></Route>
 <Route path="/Chat" render={props => <Chat {...props}></Chat>}></Route>
   
    </Switch>


    </BrowserRouter>
  );
