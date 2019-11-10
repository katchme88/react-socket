import React, { Component } from 'react'

class Receiver extends Component {
    render() {
        return(
            <div className="chatArea">
                <ul className='messages' >
                    {this.props.messages.map((msg, idx)=>{ 
                        if (msg.type === 'new message') {
                            return <li key={idx} className='message'><span className='username'>{msg.data.username}</span><span className='messageBody'>{msg.data.message}</span></li>
                        }
                        return <li></li>
                    })}
                </ul>
            </div>
        )
    }
}
  
  
export default Receiver