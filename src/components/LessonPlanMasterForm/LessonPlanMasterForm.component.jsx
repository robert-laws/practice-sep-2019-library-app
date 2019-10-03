import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Button } from 'reactstrap';
import { Form } from 'reactstrap';

import courseList from '../../data/courseList';
import librariansList from '../../data/librariansList';

import LessonPlanStepOne from './LessonPlanStepOne.component';
import LessonPlanStepTwo from './LessonPlanStepTwo.component';
import LessonPlanStepThree from './LessonPlanStepThree.component';

class LessonPlanMasterForm extends Component {
  state = {
    currentStep: 1,
    stepOne: {
      term: '0',
      courseNumber: '0',
      courseTitle: '',
      faculty: '',
      librarian: '0',
      coInstructor: '',
      date: '',
      startTime: '0',
      duration: '0',
      studentCount: '0'
    },
    stepTwo: {
      classAssignment: '',
      learningOutcomes: []
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.stepOne.courseNumber !== prevState.stepOne.courseNumber) {
      const thisCourse = courseList.filter(course => {
        return course.courseNumber === this.state.stepOne.courseNumber
      })
  
      if(thisCourse.length > 0) {
        let newState = { ...this.state.stepOne, faculty: thisCourse[0].faculty, courseTitle: thisCourse[0].courseTitle, courseNumber: this.state.stepOne.courseNumber }
        this.setState({
          stepOne: newState          
        })
      } else {
        let newState = { ...this.state.stepOne, faculty: '', courseTitle: '', courseNumber: this.state.stepOne.courseNumber }
        this.setState({
          stepOne: newState
        })
      }
    }
  }

  _next = () => {
    let currentStep = this.state.currentStep;
    currentStep = currentStep >= 2 ? 3 : currentStep + 1;

    this.setState({
      currentStep
    })
  }

  _prev = () => {
    let currentStep = this.state.currentStep;
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;

    this.setState({
      currentStep
    })
  }

  addOutcome = outcome => {
    let outcomes = this.state.stepTwo.learningOutcomes;
    outcomes = outcomes.concat(outcome);
    let newState = { ...this.state.stepTwo, learningOutcomes: outcomes}
    this.setState({
      stepTwo: newState
    })
  }

  handleChange = event => {
    const { name, value, id } = event.target;
    const tree = id.split('-')[0];
    let newState = { ...this.state[`${tree}`], [name]: value }
    this.setState({
      [`${tree}`]: newState
    })
  }

  handleSubmit = event => {
    event.preventDefault();
  }

  get previousButton() {
    const currentStep = this.state.currentStep;
    if(currentStep !== 1) {
      return (
        <Button color='secondary' onClick={this._prev}>Previous Step</Button>
      )
    }

    return null;
  }

  get nextButton() {
    const currentStep = this.state.currentStep;
    if(currentStep < 3) {
      return (
        <Button color='secondary' onClick={this._next}>Next Step</Button>
      )
    }

    return null;
  }

  render() {
    return (
      <Container className='mt-3'>
        <Row>
          <Col sm="12">
            <h4>Lesson Plan Form</h4>
          </Col>
          <Col sm="12">
            <Form onSubmit={this.handleSubmit}>
              <LessonPlanStepOne currentStep={this.state.currentStep} handleChange={this.handleChange} formData={this.state.stepOne} courses={courseList} librarians={librariansList} />
              <LessonPlanStepTwo currentStep={this.state.currentStep} handleChange={this.handleChange} formData={this.state.stepTwo} addOutcome={this.addOutcome} />
              <LessonPlanStepThree currentStep={this.state.currentStep} />

              <Row className='mt-3'>
                <Col md={12} className='d-flex justify-content-between'>
                  <div>
                    {this.previousButton}
                  </div>
                  <div>
                    {this.nextButton}
                  </div>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default LessonPlanMasterForm;