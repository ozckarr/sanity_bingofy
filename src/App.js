import { BrowserRouter, Route, Switch } from "react-router-dom";
import BingoContainer from "./components/BingoContainer";
import BingoList from "./components/BingoList";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={BingoList} path="/" exact />
        <Route component={BingoContainer} path="/:slug" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
