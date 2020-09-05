import React from "react";
import { Route } from "react-router-dom";
import Dashboard from './pages/dashboard';

export default function Router_outlet() {
    return (
        <React.Fragment>
        <Route exact path="/" component={Dashboard}></Route>
        </React.Fragment>
    );
  }
