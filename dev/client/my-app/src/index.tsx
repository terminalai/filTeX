// HANDLE REDIRECTING IN THIS FILE!!!!

import React, { createRef } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import JoinRoom from './JoinRoomScreen'
import ChatRoom from './ChatRoom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const nothingToVoid = () => {}
const messageRef = createRef<HTMLInputElement>()
const bidRef = createRef<HTMLSelectElement>()

// sets the information inside the useState stuff I think
const setInfor = (room: string, name:string, id:number) => {
  //declare xxx has join da room
}

root.render(
  <React.StrictMode>
    <ChatRoom roomCode={"ああああ"} sendMessage={nothingToVoid} leaveRoom={nothingToVoid} 
    messageRef={messageRef} bidRef={bidRef}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
