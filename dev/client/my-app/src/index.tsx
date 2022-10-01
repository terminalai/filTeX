// HANDLE REDIRECTING IN THIS FILE!!!!

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import JoinRoom from './JoinRoomScreen'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const setInfor = (room: string, name:string, id:number) => {
  //declare xxx has join da room
}

const setDisplayRuns = (bool:boolean) => () => {
  
}

root.render(
  <React.StrictMode>
    <JoinRoom setInfor={setInfor} setDisplayRuns={setDisplayRuns(true)}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
