import React, { Component, Fragment } from 'react'

class Receiver extends Component {

    getUsernameColor = (username) => {
        const COLORS = [
            '#e21400', '#91580f', '#f8a700', '#f78b00',
            '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
            '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
        ];
        // Compute hash code
        var hash = 7;
        for (var i = 0; i < username.length; i++) {
           hash = username.charCodeAt(i) + (hash << 5) - hash;
        }
        // Calculate color
        var index = Math.abs(hash % COLORS.length);
        return COLORS[index];
    }
    render() {
        return(
            <div className="chatArea">
                <ul className='messages' >
                    {this.props.messages.map((msg, idx)=> {
                        let listItem = '';
                        switch (msg.type){
                            case 'new message':
                                listItem =  <li key={idx} className='message'><span className='username' style={{color: this.getUsernameColor(msg.data.username)}}>{msg.data.username}</span><span className='messageBody'>{msg.data.message}</span></li>
                                break
                            case 'user joined':
                                listItem = <Fragment key={idx}><li  className='log' style={{display: 'list-item'}}>{msg.data.username + ' joined'}</li><li key={idx} className='log' style={{display: 'list-item'}}>{'there are ' + msg.data.numUsers + ' participants'}</li></Fragment>
                                break
                            case 'user left':
                                listItem = <Fragment key={idx}><li  className='log' style={{display: 'list-item'}}>{msg.data.username + ' left'}</li><li key={idx} className='log' style={{display: 'list-item'}}>{'there are ' + msg.data.numUsers + ' participants'}</li></Fragment>
                                break
                            case 'login':
                                listItem = <Fragment key={idx}><li  className='log' style={{display: 'list-item'}}>{'Welcome to Socket.IO Chat –'}</li><li key={idx} className='log' style={{display: 'list-item'}}>{'there are ' + msg.data.numUsers + ' participants'}</li></Fragment>
                                break
                            case 'typing':
                                    listItem =  <li key={idx} className='message'><span className='username' style={{color: this.getUsernameColor(msg.data.username)}}>{msg.data.username}</span><span className='messageBody'>{'is typing'}</span></li>
                                    break
                            default:
                                break;
                        }
                        return listItem
                    })}
                </ul>
            </div>
        )
    }
}
  
  
export default Receiver