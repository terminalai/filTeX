import './ChatRoom.css'

import React, { FC, useState, KeyboardEvent } from "react"
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
    return <div className={'sidebar-message-' + (props.i)}>
        <div className='message-flex'>
            <div className={'message-name-' + props.i}> {props.name} </div>
            <div className={'message-message-' + props.i}> {props.message} </div>
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
    const filtex = require('./sprites/filtex.png')

    const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        // Get the code of pressed key
        const keyCode = e.which || e.keyCode;    
        // 13 represents the Enter key
        if (keyCode === 13 && !e.shiftKey) {
            //send the message
            props.sendMessage()
        }
    };

    return <div key={props.messages.length}>
            <div className='sidebar'>
                <div className='sidebar-title'>
                    <button onClick={props.leaveRoom} className='leaveBtn'>
                        <svg viewBox="0 0 24 24">
                            <path fill="currentColor" d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
                        </svg>
                    </button>
                    <span className="code"> {props.roomCode} </span>
                    <img src={filtex} className="logo" alt="I LOVE filTeX"></img>
                </div>
                <div className='sidebar-message-log' key={props.messages.length} >
                    {props.messages.map((val, i) => 
                        <Message name={val[0]} message={val[1]} i={props.name == val[0] ? 1 : 0}/>
                    )}
                </div>
                <div className='flex-row'>
                    <textarea id = "message" placeholder="Type Message Here!!" inputMode="text" 
                    className='sidebar-text' ref={props.messageRef} onKeyDown={onKeyDown} />
                    <button onClick={props.sendMessage} className='submitBtn'>
                        <svg viewBox="0 0 24 24">
                            <path fill="currentColor" d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
                        </svg>
                    </button>
                </div>
                </div>
                
            </div>
}


export default ChatRoom

