import "./App.css";
import { Route, Switch } from "react-router-dom";

import Home from "./components/Home";
import Navigation from "./components/Navigation";
import Video from "./components/Video";

function App() {
  return (
    <>
      <Navigation />
      <Switch>
        <Route path="/" component={Home} exact />

        <Route path="/video/:id" component={Video} exact />
      </Switch>
    </>
  );
}

export default App;
