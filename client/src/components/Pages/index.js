import React, { Component } from 'react'
import SocketContext from '../../socket/SocketContext'
import LoginPage from './LoginPage'
import ChatPage from './ChatPage'

class Pages extends Component {
    constructor(props) {
        super(props)
        this.state = {messages: [], connected: false, username: '', numUsers: 0}
        this.props.socket.on('login', (data)=>{
            this.setState( prevState => (
                { ...prevState, connected: true, messages:[ ...prevState.messages, {type: 'login', data: data}]}
            ))}
        )
        this.props.socket.on('new message', (data)=> {
            if (this.state.connected) {
                this.setState( prevState => (
                    { ...prevState, messages: [...prevState.messages, {type: 'new message', data: data}] }
                ))
            }
        })
        this.props.socket.on('user joined', (data)=> { 
            if (this.state.connected) {
                this.setState( prevState => (
                    { ...prevState, messages: [...prevState.messages, {type: 'user joined', data: data}] }
                ))
            }
        })
        this.props.socket.on('user left', (data)=> {
            if (this.state.connected) {
                this.setState( prevState => (
                    { ...prevState, messages: [...prevState.messages, {type: 'user left', data: data}] }
                ))
            }
        })
        this.props.socket.on('typing', (data)=> {
            if (this.state.connected) {
                this.setState( prevState => (
                    { ...prevState, messages: [...prevState.messages, {type: 'typing', data: data}] }
                ))
            }
        })
        this.props.socket.on('stop typing', (data)=> {
            if (this.state.connected) {
                const msgs = this.something(data)
                this.setState( prevState => (
                   { ...prevState, messages: msgs }
                ))
            }
        })
    }

    something=(data)=>{
        let msgs = [...this.state.messages]
        for (let i = msgs.length - 1; i >= 0; i--) {
            let message = msgs[i]
            if (message.type === 'typing' & message.data.username === data.username) {
                msgs.splice(i, 1)
                return(msgs)
            }

        }
    }


    addParticipantsMessage=(message)=> {
        if (this.state.connected) {
            this.setState( prevState => (
                { ...prevState, messages: [...prevState.messages, {type: 'new message', data: {username: this.state.username, message: message}}] }
            ))
        }
    }
    addUser=(username)=> {
        this.setState( prevState => ({...prevState, username: username}))
        this.props.socket.emit('add user', username)
    }

    render() {
        return(
            <ul className='pages'>
                <ChatPage connected={this.state.connected} messages={this.state.messages} addParticipantsMessage={this.addParticipantsMessage} />
                <LoginPage connected={this.state.connected} addUser={this.addUser} />
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