import React from 'react';
import { Switch, Route } from 'react-router-dom';

// import courseList from './data/courseList';
// import librariansList from './data/librariansList';

import Navigation from './components/Navigation/Navigation.component';
import Home from './components/Home/Home.component';
// import LessonPlanForm from './components/LessonPlan/LessonPlanForm.component';

import './App.scss';

function App() {
  return (
    <>
      <Navigation />
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>

      {/* <LessonPlanForm courses={courseList} librarians={librariansList} /> */}
    </>
  );
}

export default App;
