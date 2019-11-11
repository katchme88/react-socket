import React, { Component } from 'react'
import Receiver from './Receiver'
import ConnectedSender from './Sender'

class ChatPage extends Component {

    render() {
        if (this.props.connected){
            return(
                <li className='chat page' style={{display: 'list-item'}}>
                    <Receiver messages={this.props.messages} />
                    <ConnectedSender />
                </li>
            )
        } else {
            return <li />
        }
    }
}
    
export default ChatPage