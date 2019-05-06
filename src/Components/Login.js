import React,{Component} from 'react';
import '../Css/Login.css'
import { Form,Col,Row,Container, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import axios from 'axios'

class Login extends Component {

  constructor () {
    super()
    this.state = {
      username: '',
      token:'',
      
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleClick () {
  
    axios.post('http://localhost:8080/users',{username:this.state.username})
      .then((response) => this.setState({token:response.data.Token,username:response.data.username},this.setDatainLocalStorage(response))
      
      ).catch(error => console.log(error));
    
      

  }

    setDatainLocalStorage(response){
      if(response.data.Token){
        const Details = {username:response.data.username,isAuth:true};
        localStorage.setItem('userdetails',JSON.stringify(Details));
      }

    }

    handleChange(event) {
      this.setState({username: event.target.value});
    }
  

    render(){

        return (


         <Container>
                <Row>
       <h5>{this.state.token}</h5>
       <Col>
       <Form method="POST" action="http://localhost:8080/user" className="LoginForm">
  <Form.Group as={Row} controlId="formPlaintextEmail">
    <Form.Label column sm="2">
   
    </Form.Label>
    <Col sm="10">
      <Form.Control onChange={this.handleChange} name="username"  type="text" placeholder="User"/>
    </Col>
  </Form.Group>

  <Form.Group as={Row} controlId="formPlaintextPassword">
    <Form.Label column sm="2">
      
    </Form.Label>
    <Col sm="10">
      <Form.Control type="password" placeholder="Password" readOnly  defaultValue="123456"/>
    </Col>
  </Form.Group>
  <Button onClick={this.handleClick}  variant="dark" >Login</Button>
  {this.state.token ? <Redirect to={{pathname:`/Chat`,state:{username:this.state.username}}}  />  : null}
</Form>
        
       </Col>
      
                </Row>
            </Container>
       
          );
    }

  }
  
  export default Login;
  