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
        try {
          const currentToken = await getToken(messaging, {
            vapidKey: process.env.REACT_APP_VAPID_KEY,
          });
          console.log("currentToken", currentToken);
          setToken(currentToken);
        } catch (error) {
          console.log("Error getting token", error);
        }
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
        <s>
          support? {isSupported ? "yes" : "no"} token: {token}
        </s>
        <button onClick={clicked}>Request Permission</button>
      </header>
    </div>
  );
}

export default App;
