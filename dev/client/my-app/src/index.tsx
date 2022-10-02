// HANDLE REDIRECTING IN THIS FILE!!!!

import React, { createRef, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import JoinRoom from "./JoinRoomScreen";
import ChatRoom from "./ChatRoom";
import { render } from "@testing-library/react";

import { initializeApp } from "firebase/app";
import { onMessage, getMessaging, getToken } from "firebase/messaging";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const messageRef = createRef<HTMLTextAreaElement>();

const uniqueMessages: [string, string][] = [];
uniqueMessages.push(["penis", "thisisaasdfkj"]);
uniqueMessages.push(["dick", "thisisaasdfk"]);
uniqueMessages.push([
  "What the fuck did you just fucking say about me, you little bitch? I'll have you know I graduated" +
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
    "only you could have known what unholy retribution your little \"clever\" comment was about to bring down upon you, maybe you would have held your fucking tongue. But you couldn't, you didn't, and now you're paying the price, you goddamn idiot. I will shit fury all over you and you will drown in it. You're fucking dead, kiddo.",
  "thisisaasdkj",
]);
uniqueMessages.push([
  "sdfglkjsdfgkljsdfglkjsdfglkjsdfglkjsdfglkjsdfglkjsdfglkjsdfglkjsdfglkjsdfglkjsdfrglkjsdfglkjsdfglkjsdfglkjsdfglkjsdfgasdflkjasdflkjasdflkjasdflkjasdflkjasdlkfjasdflkjasdflkjasdflkjasdflkjasdlkfjsdfglkjsdfgkljsdfglkjsdfglkjsdfglkjsdfglkjsdfglkjsdfglkjsdfglkjsdfglkjsdfglkjsdfrglkjsdfglkjsdfglkjsdfglkjsdfglkjsdfgasdflkjasdflkjasdflkjasdflkjasdflkjasdlkfjasdflkjasdflkjasdflkjasdflkjasdlkfjsdfglkjsdfgkljsdfglkjsdfglkjsdfglkjsdfglkjsdfglkjsdfglkjsdfglkjsdfglkjsdfglkjsdfrglkjsdfglkjsdfglkjsdfglkjsdfglkjsdfgasdflkjasdflkjasdflkjasdflkjasdflkjasdlkfjasdflkjasdflkjasdflkjasdflkjasdlkfj",
  "thisisaafkj",
]);
uniqueMessages.push(["asdf", "thisiasdfkj"]);
uniqueMessages.push(["qwer", "thsaasdfkj"]);
uniqueMessages.push(["qwerty", "thsaasdfkj"]);
uniqueMessages.push(["727", "thaasdfkj"]);
uniqueMessages.push(["When you see it", "tisaasdfkj"]);
uniqueMessages.push(["When you fucking see it", "tsaasdf\nkj"]);


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBxtaVZ7g9QDoeungUefcJLMK6vdbMdeAc",
    authDomain: "isad-a6e49.firebaseapp.com",
    projectId: "isad-a6e49",
    storageBucket: "isad-a6e49.appspot.com",
    messagingSenderId: "800748532654",
    appId: "1:800748532654:web:9864ce0cebc6e6eb178e3f",
    measurementId: "G-NJ2RN012XQ",
};

// Initialize Firebase and Messaging Service
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Register Device to Messaging Service
getToken(messaging, { vapidKey: "BFCPvGicZIjkqwLuu6ccqHSBVUM1eiIxyDeHscw53uy324rIgqNpoHJeiKmICDI_JXeyFTvjUAY29eYQbgeI4M0" })
    .then((currentToken) => { // On success
        if (currentToken) console.log("Token: ", currentToken);
        else console.log("No registration token available. Request permission to generate one.");
    }) // On Error
    .catch((err) => { console.log("An error occurred while retrieving token. ", err);});

function MainComponent() {
  const [inChat, setInChat] = useState<boolean>(false);
  const [roomCode, setRoomCode] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [messages, setMessages] = useState<[string, string][]>(uniqueMessages);

  const joinRoom = (room: string, name: string) => {
    // FIREBASE: CHECK IF ROOM CAN BE JOINED,
    setInfor(room, name);
  };

  // sets the information inside the useState stuff I think
  const setInfor = (room: string, name: string) => {
    // FIREBASE: ON room join, execute this command.
    console.log("hi");
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
      //FIREBASE: SEND MESSAGE TO FIREBASE
      console.log("sending message");
      //FIREBASE: WHEN RECIEVED MESSAGE, DO THIS COMMAND
      addMessage(name, message);
    }
  };

  // On message recieved
  onMessage(messaging, payload => {
    // Check for data integrity
    if (!payload.notification || !payload.notification.title || !payload.notification.body) return;

    // Add the message
    addMessage(payload.notification.title, payload.notification.body);
  })

  // FIREBASE: LEAVE TOPIC
  const leaveRoom = () => {
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
