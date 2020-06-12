import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './pages/About';
import Create from './pages/Create';
import Index from './pages/Index';
import Update from './pages/Update';
import Delete from './pages/Delete';

export default function Routes() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/about" component={About} />
          <Route path="/create" component={Create} />
          <Route path="/index" component={Index} />
          <Route path="/update/:id" component={Update} />
          <Route path="/delete" component={Delete} />
          <Route path="**" component={About} />
        </Switch>
      </BrowserRouter>
    </>
  );
}
