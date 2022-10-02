import logo from './logo.svg';
import cards from './cards.gif';
import './JoinRoomScreen.css';
import React, { FC, useState } from "react"
import ReactDOM from "react-dom"

import { createRef } from 'react';
import { InputType } from 'zlib';

const makeid = (length:number) => {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}


interface DisplayRunsProps{
  joinRoom: (room: string, name:string) => void;
}

const JoinRoom:FC<DisplayRunsProps> = (props) => {  
  const roomCodeRef = createRef<HTMLInputElement>()
  const nameRef = createRef<HTMLInputElement>()
  const filtex = require('./sprites/filtex.png')

  const submitForm = () => {
    const roomCode = roomCodeRef.current?.value
    const name = nameRef.current?.value

    var roomServer = ""

    if (roomCode == null){
      // eslint-disable-next-line no-restricted-globals
      confirm("No Room Code Was Entered!")
      return;
    }
    else if (roomCode.length !== 4) {
      // eslint-disable-next-line no-restricted-globals
      confirm("Room Code Should be Of Length 4")
      return;
    }
    else {
      for (var i =  0; i < 4; ++i){
        if (!(/[a-zA-Z]/).test(roomCode[i])) {
          // eslint-disable-next-line no-restricted-globals
          confirm("Room Code Should Only Contain Letters")
          return;
        }
      }
      roomServer = roomCode.toUpperCase()
    }

    if (name == null){
      // eslint-disable-next-line no-restricted-globals
      confirm("Please Enter a Name!")
      return;
    }
    else if (name.length === 0) {
      // eslint-disable-next-line no-restricted-globals
      confirm("Please Enter a Name!")
      return;
    }
    else{
      props.joinRoom(roomCode, name)
      //socket.emit("get-people-room", roomServer, name)
    }
  }
  // TODO change the placeholder text thing to something funnier
  console.log("in joinroom screen")
  return (
    <div className='all-div'>
      <div className="flex-main">
        <img className='img' src={filtex} alt={"filtex"}/>
        <div className='flex-row-join'>
          <p className='text-p'>Room Code:</p>
          <input id = "roomCode" ref = {roomCodeRef} defaultValue={makeid(4)} inputMode="text" className='text-input' />
        </div>
        <div className='flex-row-join'>
          <p className='text-p'>Username:</p>
          <input id = "name" ref = {nameRef} placeholder="John" inputMode="text" className='text-input'/>
        </div>
        <button className='text-button' onClick={submitForm}>ENTER ROOM</button>
      </div>
    </div>
  )
}


export default JoinRoom;
