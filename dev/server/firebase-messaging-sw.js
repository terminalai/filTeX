importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');
//Remeber this part we have used above in our index.html
const firebaseConfig = {
    apiKey: "AIzaSyBxtaVZ7g9QDoeungUefcJLMK6vdbMdeAc",
    authDomain: "isad-a6e49.firebaseapp.com",
    projectId: "isad-a6e49",
    storageBucket: "isad-a6e49.appspot.com",
    messagingSenderId: "800748532654",
    appId: "1:800748532654:web:9864ce0cebc6e6eb178e3f",
    measurementId: "G-NJ2RN012XQ"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
messaging.onBackgroundMessage(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Title';
    const notificationOptions = {
        body: payload,
        icon: '/firebase-logo.png'
    };
    self.registration.showNotification(notificationTitle,
        notificationOptions);
});