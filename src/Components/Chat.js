
import React,{Component} from 'react';
import '../Css/Chat.css';
import { Col,Row,Container,FormControl,InputGroup,Button  } from 'react-bootstrap';


class Chat extends Component{

    render(){
        return(

          <div>
                <h2 className="ChatHeader">Chat </h2>

            <Container>
                <Row>
                
                <Col sm={8} className="MainChat">
                <h5>Messages</h5>
                <div className="ChatMessages">

                </div>
                
                <InputGroup className="mb-3">
    <FormControl
      placeholder="Write message here.."
    />
    <InputGroup.Append>
      <Button variant="success">Send</Button>
    </InputGroup.Append>
  </InputGroup>
                </Col>

                <Col sm={4} className="OnlineUsers">
                    <h5>Online Users</h5>
                </Col>
                </Row>
            </Container>

          </div>

        )
    }
}

export default Chat;



