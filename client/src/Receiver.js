
import React, { Component } from 'react'
import SocketContext from './SocketContext'

class Receiver extends Component {
    constructor(props){
        super(props)
        this.state = {messages: []}
        this.props.socket.on('message', (message)=>{
            this.setState( prevState => (
                { messages: [...prevState.messages, message] }
            ))}
        )
    }

    render() {
        return(
            <div className='message-box' >
                {this.state.messages.map((msg, idx)=>{ return <div key={idx} className='message'>{msg}</div>})}
            </div>
        )
    }
}
  
const ConnectedReceiver= props => (
  <SocketContext.Consumer>
      {
        socket => <Receiver {...props} socket={socket} />
      }
  </SocketContext.Consumer>
)
  
export default ConnectedReceiver