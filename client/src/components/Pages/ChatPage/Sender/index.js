
import React, { Component } from 'react'
import SocketContext from '../../../../socket/SocketContext'

class Sender extends Component {
    constructor(props){
        super(props)
        this.state = {messages: '', typing: false, lastTypingTime: 0}
    }
    _handleKeyDown = (e) => {
        const ENTER_KEY = 13
        switch(e.keyCode) {
            case ENTER_KEY:
                this.sendMessage()
                e.target.value = ''
                break;
            default:
                break;
        }
    }
    componentDidMount = () => {
        this.props.socket.emit('connected', 'client connected')
    }
    sendMessage = () => {
        this.props.socket.emit('new message', this.state.value);
        this.props.addParticipantsMessage(this.state.value)
    }
    handleChange = (e) => {
        this.setState({value: e.target.value})
        this.updateTyping()
    }
    updateTyping = () => {
        if (!this.state.typing) {
            this.setState(prevState => ({...prevState, typing: true}))
            this.props.socket.emit('typing');
        }
        this.setState(prevState=>({...prevState, lastTypingTime: (new Date()).getTime()}))
        setTimeout(() => {
        let typingTimer = (new Date()).getTime();
        let timeDiff = typingTimer - this.state.lastTypingTime;
        if (timeDiff >= 400 && this.state.typing) {
            this.props.socket.emit('stop typing');
            this.setState(prevState => ({...prevState, typing: false}))
        }
        }, 400);
      }
    render() {
        return(
            <input type='text' className="inputMessage" placeholder="Type here..." onKeyDown={this._handleKeyDown} onChange={this.handleChange}/>
        )
    }
}
  
const ConnectedSender = props => (
  <SocketContext.Consumer>
      {
        socket => <Sender {...props} socket={socket} />
      }
  </SocketContext.Consumer>
)
  
export default ConnectedSender