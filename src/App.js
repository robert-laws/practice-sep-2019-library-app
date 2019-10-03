import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Navigation from './components/Navigation/Navigation.component';
import Home from './components/Home/Home.component';
import LessonPlanMasterForm from './components/LessonPlanMasterForm/LessonPlanMasterForm.component';

import './App.scss';

function App() {
  return (
    <>
      <Navigation />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path='/lesson-plans' component={LessonPlanMasterForm} />
      </Switch>

    </>
  );
}

export default App;
