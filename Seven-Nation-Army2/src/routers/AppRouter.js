import React, { Component } from "react";
import Login from "../pages/Login";
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const AppRouter = () => (
    <div className="backgroundPart">
    <BrowserRouter>
        <Switch>
        <Route path="/" component={Login} />
        </Switch>
        </BrowserRouter>
  
    </div>
  );
  
  export default AppRouter;