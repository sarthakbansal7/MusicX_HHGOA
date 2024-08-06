import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import IntroductionPage from "./IntroductionPage/IntroductionPage";
import JoinRoomPage from "./JoinRoomPage/JoinRoomPage";
import RoomPage from "./RoomPage/RoomPage";
import { connectWithSocketIOServer } from "./utils/wss";

import "./App.css";
import GameScreen from "./GamePage/GameScreen";

function App() {
  useEffect(() => {
    connectWithSocketIOServer();
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/join-room">
          <JoinRoomPage />
        </Route>
        <Route path="/room">
          <RoomPage />
        </Route>
        <Route path="/gameScreen">
          <GameScreen />
        </Route>
        <Route path="/">
          <IntroductionPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
