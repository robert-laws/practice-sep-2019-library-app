import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Navigation from './components/Navigation/Navigation.component';
import Home from './components/Home/Home.component';
import LessonPlans from './components/LessonPlans/LessonPlans.component';
import LessonPlanMasterForm from './components/LessonPlanMasterForm/LessonPlanMasterForm.component';
import LessonPlanDetail from './components/LessonPlansDetail/LessonPlansDetail.component';

import './App.scss';

function App() {
  return (
    <>
      <Navigation />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path='/lesson-plans' component={LessonPlans} />
        <Route exact path='/lesson-plan-form' component={LessonPlanMasterForm} />
        <Route exact path='/lesson-plan/:docName' component={LessonPlanDetail} />
      </Switch>

    </>
  );
}

export default App;
