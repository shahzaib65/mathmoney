
import firebase from "firebase/compat/app";

const firebaseConfig = {
  apiKey: "AIzaSyAX1gIcHSF5v6siPnDDSgujyTdzX4BgQuo",
  authDomain: "mathmoney-f58a2.firebaseapp.com",
  projectId: "mathmoney-f58a2",
  storageBucket: "mathmoney-f58a2.appspot.com",
  messagingSenderId: "934520177210",
  appId: "1:934520177210:web:27592b2736a27acc402b03"
};

const app = firebase.initializeApp(firebaseConfig);

export default app;