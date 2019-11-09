
import React, { Component } from 'react'
import SocketContext from './SocketContext'

class Sender extends Component {
    constructor(props){
        super(props)
        this.state = {messages: ''}
    }
    componentDidMount = () => {
        this.props.socket.emit('connected', 'client connected')
    }
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.socket.emit('message', this.state.value);
        e.target.querySelector('input[type="text"]').value = ''
    }
    handleChange = (e) => {
        this.setState({value: e.target.value})
    }
    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <input type="text" onChange={this.handleChange} />
                <input type="submit" value="Submit" />
            </form>
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