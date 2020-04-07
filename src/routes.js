
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Carrinho from "./Carrinho";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/carrinho" component={Carrinho} />
      <Route path="/config" component={Home} />
      <Route path="*" component={Home} />
    </Switch>
  </BrowserRouter>
);

export default Routes;