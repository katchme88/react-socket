import React, { Component } from 'react'

class LoginPage extends Component {
    
    _handleKeyDown = (e) => {
        const ENTER_KEY = 13
        switch(e.keyCode) {
            case ENTER_KEY:
                this.props.addUser(e.target.value)
                e.target.value = ''
                break;
            default:
                break;
        }
    }
    
    render() {
        if (this.props.connected) {
            return <li></li>
        }
        return(
            <li className='login page' style={{display: 'list-item'}}>
                <div className="form">
                    <h3 className='title'>What's your nickname?</h3>
                    <input className='usernameInput' type='text' maxLength='14' onKeyDown={this._handleKeyDown} />
                </div>
            </li>
        )
    }
}
  
export default LoginPage