import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreateGame from "./CreateGame";

function App() {

  return (
    <Router>
      <Switch>
        <Route path="/">
          <CreateGame />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
