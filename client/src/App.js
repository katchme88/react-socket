import React from 'react';
import './App.css';
import SocketContext from './SocketContext'
import * as io from 'socket.io-client'
import ConnectedSender from './Sender'
import ConnectedReceiver from './Receiver';

const socket = io('http://localhost:5000')

class App extends React.Component {
  render (){
    return (
      <SocketContext.Provider value={socket}>
        <ConnectedReceiver />
        <ConnectedSender />
      </SocketContext.Provider>
    );
  }
}

export default App;
