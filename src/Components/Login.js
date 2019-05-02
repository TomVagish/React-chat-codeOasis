import React,{Component} from 'react';
import '../Css/Login.css'
import { Form,Col,Row,Container, Button } from 'react-bootstrap';

class Login extends Component {

    render(){

        return (



     

         <Container>
                <Col>
         
                <h1 className="LoginHeader">Sign in</h1>

            <Form className="LoginForm">
  <Form.Group as={Row} controlId="formPlaintextEmail">
    <Form.Label column sm="2">
      User
    </Form.Label>
    <Col sm="10">
      <Form.Control   type="text" />
    </Col>
  </Form.Group>

  <Form.Group as={Row} controlId="formPlaintextPassword">
    <Form.Label column sm="2">
      Password
    </Form.Label>
    <Col sm="10">
      <Form.Control type="password" placeholder="Password" readOnly  defaultValue="123456"/>
    </Col>
  </Form.Group>
</Form>
        
        <Button variant="dark" >Login</Button>
         
                </Col>
            </Container>
       
          );
    }

  }
  
  export default Login;
  