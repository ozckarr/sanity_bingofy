import { BrowserRouter, Route, Switch } from "react-router-dom";
import SinglePost from "./components/SinglePost";
import Post from "./components/Post";
import BingoContainer from "./components/BingoContainer";
import BingoList from "./components/BingoList";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={BingoList} path="/" exact />
        <Route component={BingoContainer} path="/:slug" />
        <Route component={SinglePost} path="/post/:slug" />
        <Route component={Post} path="/post" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
