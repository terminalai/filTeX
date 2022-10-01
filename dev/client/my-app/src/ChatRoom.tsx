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
    return <div className={'sidebar-message-' + (props.i%2)}>
        {props.message}
    </div>
}


interface ChatRoomProps{
    roomCode: string
    sendMessage: () => void
    leaveRoom: () => void
    messageRef: React.RefObject<HTMLInputElement>
    bidRef: React.RefObject<HTMLSelectElement>
}

const ChatRoom:FC<ChatRoomProps> = (props) =>{
    const uniqueMessages:[string,string][] = []
    uniqueMessages.push(["penis", "thisisaasdfkj"])
    uniqueMessages.push(["dick", "thisisaasdfk"])
    uniqueMessages.push(["What the fuck did you just fucking say about me, you little bitch? I'll have you know I graduated" + 
                        "top of my class in the Navy Seals, and I've been involved in numerous secret raids on Al-Quaeda, and I " + 
                        "have over 300 confirmed kills. I am trained in gorilla warfare and I'm the top sniper in the entire US " + 
                        "armed forces. You are nothing to me but just another target. I will wipe you the fuck out with precision " + 
                        "the likes of which has never been seen before on this Earth, mark my fucking words. You think you can get " + 
                        "away with saying that shit to me over the Internet? Think again, fucker. As we speak I am contacting my " + 
                        "secret network of spies across the USA and your IP is being traced right now so you better prepare for " + 
                        "the storm, maggot. The storm that wipes out the pathetic little thing you call your life. You're fucking dead, " + 
                        "kid. I can be anywhere, anytime, and I can kill you in over seven hundred ways, and that's just with my bare hands. " + 
                        "Not only am I extensively trained in unarmed combat, but I have access to the entire arsenal of the United States Marine " + 
                        "Corps and I will use it to its full extent to wipe your miserable ass off the face of the continent, you little shit. If " + 
                        "only you could have known what unholy retribution your little \"clever\" comment was about to bring down upon you, maybe you would have held your fucking tongue. But you couldn't, you didn't, and now you're paying the price, you goddamn idiot. I will shit fury all over you and you will drown in it. You're fucking dead, kiddo.", "thisisaasdkj"])
    uniqueMessages.push(["Lopado­temacho­selacho­galeo­kranio­leipsano­drim­hypo­trimmato­silphio­karabo­melito­katakechy­meno­kichl­epi­kossypho­phatto­perister­alektryon­opte­kephallio­kigklo­peleio­lagoio­siraio­baphe­tragano­pterygonLopado­temacho­selacho­galeo­kranio­leipsano­drim­hypo­trimmato­silphio­karabo­melito­katakechy­meno­kichl­epi­kossypho­phatto­perister­alektryon­opte­kephallio­kigklo­peleio­lagoio­siraio­baphe­tragano­pterygon", "thisisaafkj"])
    uniqueMessages.push(["asdf", "thisiasdfkj"])
    uniqueMessages.push(["qwer", "thsaasdfkj"])
    uniqueMessages.push(["qwerty", "thsaasdfkj"])
    uniqueMessages.push(["727", "thaasdfkj"])
    uniqueMessages.push(["When you see it", "tisaasdfkj"])
    uniqueMessages.push(["When you fucking see it", "tsaasdfkj"])

    return <div>
            <div className='sidebar'>
                <div className='sidebar-title'>
                    <div>
                        {"Room Code: " + props.roomCode}
                        {"Room Name: uwu im a cat nya" + props.roomCode}
                    </div>
                </div>
                <div className='sidebar-message-log'>
                    {uniqueMessages.map((val, i) => 
                    <div className={'sidebar-message-' + (i%2)}> {val[0]} </div>
                    )}
                </div>
                <div className='flex-row'>
                    <input id = "message" placeholder="Message" inputMode="text" className='sidebar-text' ref={props.messageRef}/>
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

