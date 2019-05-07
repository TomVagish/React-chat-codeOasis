import React, {Component} from 'react';
import '../Css/Chat.css';
import {
    Col,
    Row,
    Container,
    FormControl,
    InputGroup,
    Button
} from 'react-bootstrap';
import io from 'socket.io-client';

class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: props.location.state.username,
            mySocketID: '',
            messageFromInput: '',
            endpoint: "http://localhost:8080/",
            messages: [],
            placeholder: 'Write message here..',
            ConnectedUsers: [],
            openChat: false,
            CurrentUserToChatWIth: ''
        }

        // function to handle data
        this.joinChat = this
            .joinChat
            .bind(this);
        this.sendMessage = this
            .sendMessage
            .bind(this);
        this.handleMessage = this
            .handleMessage
            .bind(this);
        this.openChatWith = this
            .openChatWith
            .bind(this);
        this.scrollToBottom = this
            .scrollToBottom
            .bind(this);
    }

    componentDidMount() {
        // open socket with server
        this.socket = io();

        // call to emit that i'm joined to chat!
        this.joinChat();

        // handle incoming messages and checks how send it to me
        this
            .socket
            .on('message', message => {
                if (message.user !== this.state.CurrentUserToChatWIth.username || this.state.CurrentUserToChatWIth.username === '') {
                    alert(message.user + " want to talk with you..")
                } else {
                    this.setState({
                        messages: [
                            ...this.state.messages,
                            message
                        ]
                    });

                }

            });

        // get all connected users.
        this
            .socket
            .on('connections', connections => {
                this.setState({ConnectedUsers: connections});
            });

    }

    // emit that i'm joined to chat!
    joinChat() {
        this
            .socket
            .emit('join', {user: this.state.username})
    }

    // scroll the chat down
    scrollToBottom() {
        this.messagesEnd.scrollTop = this.messagesEnd.scrollHeight;
    }

    sendMessage() {

        if (this.state.messageFromInput !== '') {
            // emit the message to user that i click on him with message
            this
                .socket
                .emit('message', {
                    chatWith: this.state.CurrentUserToChatWIth,
                    chatWithName: this.state.username,
                    message: this.state.messageFromInput
                });
            // push my message to array to displat them in chat
            const myMessage = {
                user: this.state.username,
                message: this.state.messageFromInput
            };
            this.setState({
                messages: [
                    ...this.state.messages,
                    myMessage
                ]
            });

            this.scrollToBottom();

            // clear the input
            this.setState({messageFromInput: ''});
            this.inputMessage.value = '';
        } else {
            // checks if user want to send message to himself
            this.setState({placeholder: 'Cannot send empty message !'})
            setTimeout(() => {
                this.setState({placeholder: 'Write message here..'})
            }, 2000)
        }

    }

    // function that hadle the user that i want to talk with him
    openChatWith(userToChetWith) {
        // clear the messages after i changing user to talk with him
        this.setState({messages: []})
        if (userToChetWith.username === this.state.username) {
            alert('You cannot talk with yourself...')

        } else {
            // changes in state the current user & aemit him message
            this.setState({CurrentUserToChatWIth: userToChetWith});
            this
                .socket
                .emit('openChatWith', {
                    chatWith: userToChetWith.socketid,
                    me: this.state.username
                });
            this.setState({openChat: true});
        }

    }

    // handle the message input
    handleMessage(event) {
        this.setState({messageFromInput: event.target.value});
    }
    render() {

        // some style to conline users
        const onlineUserChat = {
            background: '#333333e1',
            color: 'white'
        }

        // run on messages and display them in chat
        const messages = this
            .state
            .messages
            .map((message, index) => {
                return <li className="allMessages" key={index}>
                    <b>
                        {this.state.username === message.user
                            ? <h3 className="MeinChat">Me</h3>
                            : message.user}
                        :
                    </b>{message.message}
                    <hr></hr>
                </li>
            })

        // run on connected users and display them
        const ConnectedUsers = this
            .state
            .ConnectedUsers
            .map((user, index) => {
                return <h5
                    style={this.state.CurrentUserToChatWIth.username === user.username
                    ? onlineUserChat
                    : {}}
                    className="allConnectedUsers"
                    key={index}>
                    <b onClick={() => this.openChatWith(user)}>{this.state.username === user.username
                            ? 'Me'
                            : user.username}</b>
                </h5>
            })

        return (

            <div>
                <h2 className="ChatHeader">Chat
                </h2>

                <Container>
                    <Row>

                        <Col sm={8} className="MainChat">
                            <h3 className="wellcomeUserStyle">Wellcome..
                                <b>{this.state.username}</b>
                            </h3>
                            <hr></hr>
                            <div
                                ref={(el) => {
                                this.messagesEnd = el;
                            }}
                                className="ChatMessages">
                                {messages}
                            </div>

                            {this.state.openChat
                                ? <InputGroup onChange={this.handleMessage} className="mb-3">

                                        <FormControl
                                            ref={el => this.inputMessage = el}
                                            placeholder={this.state.placeholder}
                                            onKeyPress={event => {
                                            if (event.key === 'Enter') {
                                                this.sendMessage()
                                            }
                                        }}/>

                                        <InputGroup.Append></InputGroup.Append>
                                    </InputGroup>

                                : null
}

                        </Col>

                        <Col sm={4}>
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
