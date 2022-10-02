import './ChatRoom.css'

import React, { FC, useState } from "react"
import ReactDOM from "react-dom"

import { createRef } from 'react';
import { InputType } from 'zlib';

interface MessageProps{
    name: string
    message: string
    i: number
}

const Message:FC<MessageProps> = (props) => {
    console.log("the following message has been sent:" + props.message)
    return <div className={'sidebar-message-' + (props.i%2)}>
        <div className='message-flex'>
            <div className='message-name'> {props.name} </div>
            <div className='message-message'> {props.message} </div>
        </div>
    </div>
}


interface ChatRoomProps{
    roomCode: string
    sendMessage: () => void
    leaveRoom: () => void
    messageRef: React.RefObject<HTMLTextAreaElement>
    name: string
    messages: [string, string][]
}

const ChatRoom:FC<ChatRoomProps> = (props) => {

    return <div key={props.messages.length}>
            <div className='sidebar'>
                <div className='sidebar-title'>
                {"Room Code: " + props.roomCode + "\nRoom Name: uwu im a cat nya" + "ああああ"}
                </div>
                <div className='sidebar-message-log' key={props.messages.length}>
                    {props.messages.map((val, i) => 
                        <Message name={val[0]} message={val[1]} i={i}/>
                    )}
                </div>
                <div className='flex-row'>
                    <textarea id = "message" placeholder="Message" inputMode="text" className='sidebar-text' ref={props.messageRef}/>
                    <button onClick={props.sendMessage} className='sidebar-button'>
                    Send!
                    </button>
                </div>
                <button onClick={props.leaveRoom} className='sidebar-button'>
                    Leave Room!
                </button>
                </div>
                
            </div>
}


export default ChatRoom

