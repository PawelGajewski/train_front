import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import MyAccount from "./components/MyAccount";
import Sizes from "./components/Sizes";
import Me from "./components/Me";
import Achievments from "./components/Achievments";

function App() {
  return (
    <div className="root">
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/account" exact component={MyAccount} />
          <Route path="/sizes" exact component={Sizes} />
          <Route path="/me" exact component={Me} />
          <Route path="/achievments" exact component={Achievments} />
          {/* <Route component={NotFound} /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
