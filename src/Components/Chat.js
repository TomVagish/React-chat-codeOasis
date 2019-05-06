
import React,{Component} from 'react';
import '../Css/Chat.css';
import { Col,Row,Container,FormControl,InputGroup,Button  } from 'react-bootstrap';
import io from 'socket.io-client';

class Chat extends Component{

  constructor(props){
    super(props);
    this.state ={
      username:props.location.state.username,
      mySocketID:'',
      messageFromInput:'',
      endpoint: "http://localhost:8080/",
      messages:[],
      placeholder: 'Write message here..',
      ConnectedUsers:[],
      openChat:false ,
      CurrentUserToChatWIth:'',
    }

 
    this.joinChat = this.joinChat.bind(this);
     this.sendMessage = this.sendMessage.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.openChatWith = this.openChatWith.bind(this);
  }

  

  componentDidMount(){

    this.socket = io(this.state.endpoint);

    this.joinChat();
    
    
    this.socket.on('message',message =>{
      this.setState({messages:[...this.state.messages,message]});
    });

    this.socket.on('connections',connections =>{
      console.log(connections);
      this.setState({ConnectedUsers:connections});
    });

    this.socket.on('new-chat',chat =>{
      console.log(chat);
    });
  }

joinChat() {
  this.socket.emit('join', {user:this.state.username})
}


sendMessage(){

  if(this.state.messageFromInput !== ''){
    this.socket.emit('message', {chatWith:this.state.CurrentUserToChatWIth,chatWithName:this.state.username,message:this.state.messageFromInput});
    this.setState({messages:[...this.state.messages,'ll']});
    console.log(this.state.messages);
    this.setState({messageFromInput: ''});
    this.inputMessage.value = '';
  }else{
    this.setState({placeholder:'Cannot send empty message !'})
    setTimeout(() =>{
      this.setState({placeholder:'Write message here..'})
    },2000)
  }

 
}

openChatWith(userToChetWith){

  if(userToChetWith.username === this.state.username){
    alert('You cannot talk with yourself...')
    
  }else{
    this.setState({CurrentUserToChatWIth:userToChetWith});
    this.socket.emit('openChatWith', {chatWith:userToChetWith.socketid,me:this.state.username});
    this.setState({openChat:true});
  }  
  }
  


handleMessage(event) {
  this.setState({messageFromInput: event.target.value});
}
    render(){

      const onlineUserChat = {
        background:'#333333e1',
        color:'white',
        
      }

      const messages = this.state.messages.map((message,index) =>{
        return <li  className="allMessages"  key={index}><b> {this.state.username === message.user ? <h3 className="MeinChat">Me</h3> : message.user } : </b>{message.message} <hr></hr></li>
      })

      const ConnectedUsers = this.state.ConnectedUsers.map((user,index) =>{
        return <h5 style={this.state.CurrentUserToChatWIth.username === user.username ? onlineUserChat : {}} className="allConnectedUsers"  key={index}> <b  onClick={()=> this.openChatWith(user)}>{this.state.username === user.username? 'Me' : user.username}</b> </h5>
      })
     

        return(

          <div>
                <h2 className="ChatHeader">Chat </h2>

            <Container>
                <Row>
           
                <Col sm={8} className="MainChat">
                <h3 className="wellcomeUserStyle">Wellcome.. <b>{this.state.username}</b></h3>
                <hr></hr>
                <div className="ChatMessages">
                    {messages}
                </div>
                
              {this.state.openChat ? 
                              <InputGroup  onChange={this.handleMessage} className="mb-3">
                
                              <FormControl
                             ref={el => this.inputMessage = el}
                                placeholder={this.state.placeholder}
                              />
                              
                              <InputGroup.Append>
                              
                                <Button onClick={this.sendMessage} variant="success">Send</Button>
                                
                              </InputGroup.Append>
                            </InputGroup> 

                            : null
            
            }


                </Col>

                <Col sm={4} >
                    <h5 className="OnlineUsers">Online Users</h5>
                  {ConnectedUsers}
                </Col>
                </Row>
            </Container>

          </div>

        )
    }
}

export default Chat;



