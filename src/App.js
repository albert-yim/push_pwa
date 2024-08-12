import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { getToken } from "firebase/messaging";
import { messaging } from "./firebase";

function App() {
  const [token, setToken] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  useEffect(() => {
    async function requestPermission() {
      const isSupported = () =>
        "Notification" in window &&
        "serviceWorker" in navigator &&
        "PushManager" in window;
      if (!isSupported) return;
      const permission = await Notification.requestPermission();

      if (permission === "granted") {
        console.log("get permission");
        console.log("OK test");
        getToken(messaging, {
          vapidKey: process.env.REACT_APP_VAPID_KEY,
        })
          .then((currentToken) => {
            console.log(`I got it ${currentToken}`);
            setToken(currentToken);
          })
          .catch((err) => console.log(err));
      } else {
        console.log("denided permission");
      }
    }
    requestPermission();
  }, [isClicked]);
  const clicked = () => {
    setIsClicked(!isClicked);
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={clicked}>Request Permission</button>
        <s>token: ${token}</s>
      </header>
    </div>
  );
}

export default App;
