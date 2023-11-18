import socketIO from 'socket.io-client'
import {Route, Routes} from "react-router-dom";
import HomePage from "./components/home/HomePage";
import ChatPage from "./components/chat/ChatPage";

const socket = socketIO.connect('http://localhost:5000')

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage socket={socket} />} />
      <Route path='/chat' element={<ChatPage socket={socket} />} />
    </Routes>
  );
}

export default App;
