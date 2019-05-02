
import React,{Component} from 'react';
import '../Css/Chat.css';
import { Col,Row,Container,FormControl,InputGroup,Button  } from 'react-bootstrap';


class Chat extends Component{

    render(){
        return(

            <Container>
                <h2 className="ChatHeader">Chat </h2>
                <Row>
                
                <Col sm={8} className="MainChat">
                <lable>Oddds</lable>

                
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
                    <lable>Online Users</lable>
                </Col>
                </Row>
            </Container>

        )
    }
}

export default Chat;



