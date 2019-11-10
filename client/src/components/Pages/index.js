import React, { Component } from 'react'
import SocketContext from '../../socket/SocketContext'
import LoginPage from './LoginPage'
import ChatPage from './ChatPage'

class Pages extends Component {
    constructor(props){
        super(props)
        this.state = {messages: [], isLoggedIn: true}
        this.props.socket.on('new message', (data)=>{
            this.setState( prevState => (
                { messages: [...prevState.messages, {type: 'new message', data: data}] }
            ))}
        )
        this.props.socket.on('login', (data)=>{
            this.setState( prevState => (
                { ...prevState, isLoggedIn: true}
            ))}
        )
        this.props.socket.on('user joined', (data)=>{
            this.setState( prevState => (
                { messages: [...prevState.messages, {type: 'user joined', data: data}] }
            ))}
        )
        this.props.socket.on('user left', (data)=>{
            this.setState( prevState => (
                { messages: [...prevState.messages, {type: 'user left', data: data}] }
            ))}
        )
        this.props.socket.on('typing', (data)=>{
            this.setState( prevState => (
                { messages: [...prevState.messages, {type: 'typing', data: data}] }
            ))}
        )
        this.props.socket.on('stop typing', (data)=>{
            this.setState( prevState => (
                { messages: [...prevState.messages, {type: 'stop typing', data: data}] }
            ))}
        )
    }

    render() {
        return(
            <ul className='pages'>
                <ChatPage isLoggedIn={this.state.isLoggedIn} messages={this.state.messages}/>
                <LoginPage isLoggedIn={this.state.isLoggedIn}/>
            </ul>
        )
    }
}
  
const ConnectedPages= props => (
  <SocketContext.Consumer>
      {
        socket => <Pages {...props} socket={socket} />
      }
  </SocketContext.Consumer>
)
  
export default ConnectedPages