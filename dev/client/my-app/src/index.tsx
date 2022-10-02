// HANDLE REDIRECTING IN THIS FILE!!!!

import React, { createRef, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import JoinRoom from "./JoinRoomScreen";
import ChatRoom from "./ChatRoom";
import { render } from "@testing-library/react";

import { initializeApp } from "firebase/app";
import { getDatabase, connectDatabaseEmulator, ref, set, onValue, get } from "firebase/database";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

const messageRef = createRef<HTMLTextAreaElement>();

const uniqueMessages: [string, string][] = [];


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBxtaVZ7g9QDoeungUefcJLMK6vdbMdeAc",
    authDomain: "isad-a6e49.firebaseapp.com",
    projectId: "isad-a6e49",
    storageBucket: "isad-a6e49.appspot.com",
    databaseURL: "https://isad-a6e49-default-rtdb.asia-southeast1.firebasedatabase.app",
    appId: "1:800748532654:web:9864ce0cebc6e6eb178e3f",
    measurementId: "G-NJ2RN012XQ",
};

// Initialize Firebase and Messaging Service
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

if (location.hostname === "localhost") {
    // Point to the RTDB emulator running on localhost.
    connectDatabaseEmulator(database, "localhost", 9000);
}

function MainComponent() {
    const [inChat, setInChat] = useState<boolean>(false);
    const [roomCode, setRoomCode] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [messages, setMessages] = useState<[string, string][]>(uniqueMessages);

    useEffect(() => {
        window.addEventListener('beforeunload', leaveRoom );
        window.addEventListener('unload', leaveRoom );
        return () => {
            window.removeEventListener('beforeunload', leaveRoom);
            window.removeEventListener('unload', leaveRoom);
        }
    })

    const joinRoom = async (room: string, name: string) => {
        
        // Register username to a room (creating room if not found)
        if (!(await get(ref(database, "rooms/" + room + "/" + name))).exists())
            set(ref(database, "rooms/" + room + "/" + name), true)
        else {
            // Must have unique username
            console.log("User already exists")
            return;
        }

        // FIREBASE: ON room join, fetch all the data and hook up listener
        onValue(ref(database, "messages/" + room), room => {
            room.forEach((message) => { addMessage(message.val().username, message.val().message) })
        });

        setInfor(room, name);
    };

    // sets the information inside the useState stuff I think
    const setInfor = (room: string, name: string) => {
        setRoomCode(room);
        setName(name);
        setInChat(true);
    };

    const addMessage = (name: string, message: string) => {
        setMessages((prev) => {
            const newPrev = JSON.parse(JSON.stringify(prev));
            newPrev.push([name, message]);
            messageRef.current!.value = "";

            return newPrev;
        });
    };

    const sendMessage = () => {
        const message = messageRef.current?.value;
        console.log(message);
        if (message !== null && message !== undefined && message.length > 0) {

            // Upload to server
            set(ref(database, "messages/" + roomCode + "/" +  Date.now()), {
                username:  name,
                message:   message
            })

        }
    };

    const leaveRoom = () => {
        set(ref(database, "rooms/" + roomCode + "/" + name), null);
        setMessages([]);
        setInChat(false)
    }

    if (inChat) {
        console.log("rendering inchat");
        console.log("in chat render:" + messages);
        return (
            <ChatRoom
                key={messages.length}
                roomCode={roomCode}
                sendMessage={sendMessage}
                leaveRoom={leaveRoom}
                messageRef={messageRef}
                name={name}
                messages={messages}
            />
        );
    } else {
        console.log("rendering title");
        return <JoinRoom joinRoom={joinRoom} />;
    }
}

root.render(
    <React.StrictMode>
        <MainComponent />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
