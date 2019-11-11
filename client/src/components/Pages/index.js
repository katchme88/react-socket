import React, { Component } from 'react'
import SocketContext from '../../socket/SocketContext'
import LoginPage from './LoginPage'
import ChatPage from './ChatPage'

class Pages extends Component {
    constructor(props){
        super(props)
        this.state = {messages: [], connected: false, userName: '', numUsers: 0}
        this.props.socket.on('new message', (data)=>{
            this.setState( prevState => (
                { ...prevState, messages: [...prevState.messages, {type: 'new message', data: data}] }
            ))}
        )
        this.props.socket.on('login', (numUsers)=>{
            this.setState( prevState => (
                { ...prevState, connected: true, numUsers: numUsers}
            ))}
        )
        this.props.socket.on('user joined', (data)=>{
            this.setState( prevState => (
                { ...prevState, messages: [...prevState.messages, {type: 'user joined', data: data}] }
            ))}
        )
        this.props.socket.on('user left', (data)=>{
            this.setState( prevState => (
                { ...prevState, messages: [...prevState.messages, {type: 'user left', data: data}] }
            ))}
        )
        this.props.socket.on('typing', (data)=>{
            this.setState( prevState => (
                { ...prevState, messages: [...prevState.messages, {type: 'typing', data: data}] }
            ))}
        )
        this.props.socket.on('stop typing', (data)=>{
            this.setState( prevState => (
                { ...prevState, messages: [...prevState.messages, {type: 'stop typing', data: data}] }
            ))}
        )
    }

    addUser=(userName)=>{
        this.setState( prevState => ({...prevState, userName: userName}))
        this.props.socket.emit('add user', this.state.userName)
    }

    render() {
        return(
            <ul className='pages'>
                <ChatPage connected={this.state.connected} messages={this.state.messages}/>
                <LoginPage connected={this.state.connected} addUser={this.addUser}/>
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