import React from 'react';
import {BrowserRouter, Route ,Switch} from 'react-router-dom'

import App from '../App';
import Chat from '../Components/Chat';


export default () => 
  (
    <BrowserRouter>
    <Switch>
     
  <Route  path="/" component={App} exact ></Route>
 <Route  path="/Chat" component={Chat} ></Route>
 <Route  path="*" component={() => "not found"}></Route>
   
    </Switch>


    </BrowserRouter>
  );
