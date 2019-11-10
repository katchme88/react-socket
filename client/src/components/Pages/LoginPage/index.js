import React, { Component } from 'react'

class LoginPage extends Component {
    render() {
        if (this.props.isLoggedIn) {
            return <li></li>
        }
        return(
            <li className='login page' style={{display: 'list-item'}}>
                <div className="form">
                    <h3 className='title'>What's your nickname?</h3>
                    <input className='usernameInput' type='text' maxLength='14'></input>
                </div>
            </li>
        )
    }
}
  
export default LoginPage