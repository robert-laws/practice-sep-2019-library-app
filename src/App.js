import React from 'react';
import './App.scss';
import { Container } from 'reactstrap';

import courseList from './data/courseList';
import librariansList from './data/librariansList';

import LessonPlanForm from './components/LessonPlan/LessonPlanForm.component';

function App() {
  return (
    <Container>
      <h1>Library App</h1>
      <LessonPlanForm courses={courseList} librarians={librariansList} />
    </Container>
  );
}

export default App;
