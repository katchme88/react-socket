import React from 'react';
import SocketContext from '../../socket/SocketContext'
import * as io from 'socket.io-client'
import ConnectedPages from '../Pages'

const socket = io('http://localhost:5000')

class App extends React.Component {
  render (){
    return (
      <SocketContext.Provider value={socket}>
        <ConnectedPages />
      </SocketContext.Provider>
    );
  }
}

export default App;
