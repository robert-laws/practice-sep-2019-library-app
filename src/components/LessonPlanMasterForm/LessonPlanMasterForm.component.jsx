import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Button } from 'reactstrap';
import { Form } from 'reactstrap';

import courseList from '../../data/courseList';
import librariansList from '../../data/librariansList';
import modulesList from '../../data/modules';

import LessonPlanStepOne from './LessonPlanStepOne.component';
import LessonPlanStepTwo from './LessonPlanStepTwo.component';
import LessonPlanStepThree from './LessonPlanStepThree.component';

class LessonPlanMasterForm extends Component {
  state = {
    currentStep: 1,
    learningOutcome: '',
    resource: '',
    custom: false,
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
      learningOutcomes: [],
      informationLiteracy: [
        {id: 1, name: 'Avoiding Plagiarism', checked: false},
        {id: 2, name: 'Citing', checked: false},
        {id: 3, name: 'Evaluating Sources', checked: false},
        {id: 4, name: 'Literature Review', checked: false},
        {id: 5, name: 'Finding Journal Articles', checked: false},
        {id: 6, name: 'Finding/Using Multimedia Sources', checked: false},
        {id: 7, name: 'Gathering Data/Statistics', checked: false},
        {id: 8, name: 'Primary Sources', checked: false},
        {id: 9, name: 'Scholarly vs. Non-scholarly Sources', checked: false},
        {id: 10, name: 'Search Strategy/Skills', checked: false},
        {id: 11, name: 'Software Instruction', checked: false}
      ],
      thresholdConcepts: [
        {id: 1, name: 'Authority is Constructed and Contextual', checked: false},
        {id: 2, name: 'Information Creation as a Process', checked: false},
        {id: 3, name: 'Information has Value', checked: false},
        {id: 4, name: 'Research as Inquiry', checked: false},
        {id: 5, name: 'Scholarship as Conversation', checked: false},
        {id: 6, name: 'Search as Strategic Exploration', checked: false}
      ]
    },
    stepThree: {
      moduleName: '0',
      modules: [],
      resources: []
    }
  }

  addCustomModule = customContent => {
    const groupName = customContent.customFormConceptsGroupName === '' ? 'none' : customContent.customFormConceptsGroupName;

    let myModule = {
      id: customContent.id,
      moduleName: customContent.customModuleName,
      time: customContent.customTime,
      concepts: [
        {
          id: '1',
          groupName: groupName,
          details: customContent.customFormConceptsGroupDetailEntries
        }
      ]
    }

    let modules = this.state.stepThree.modules;
    modules = modules.concat(myModule);
        
    let newState = { ...this.state.stepThree, moduleName: '0', modules }

    this.setState({
      stepThree: newState,
      custom: false
    })
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
    } else if(this.state.stepThree.moduleName !== prevState.stepThree.moduleName && this.state.stepThree.moduleName !== '0') {
      let thisModule = {};

      if(this.state.stepThree.moduleName === 'custom') {
        let modules = this.state.stepThree.modules;
        
        let newState = { ...this.state.stepThree, moduleName: '0', modules }
        this.setState({
          stepThree: newState,
          custom: true,
        })
      } else {
        thisModule = modulesList.filter(module => {
          return module.moduleName === this.state.stepThree.moduleName
        })
        
        let modules = this.state.stepThree.modules;
        modules = modules.concat(thisModule);
        
        let newState = { ...this.state.stepThree, moduleName: '0', modules }
        this.setState({
          stepThree: newState
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

  addToList = event => {
    const { id } = event.target;
    const step = id.split('-')[0];
    const list = id.split('-')[1];
    const stateValue = list.substring(0, list.length - 1);

    let array = this.state[`${step}`][`${list}`];
    if (this.state[`${stateValue}`] !== '') {
      array = array.concat(this.state[`${stateValue}`]);
      let newState = { ...this.state[`${step}`], [`${list}`]: array }
      this.setState({
        [`${step}`]: newState
      })

      this.setState({
        [`${stateValue}`]: ''
      })
    }
  }

  handleChange = event => {
    const { name, value, id } = event.target;
    if (id.split('-').length > 1) {
      const tree = id.split('-')[0];
      let newState = { ...this.state[`${tree}`], [name]: value }
      this.setState({
        [`${tree}`]: newState
      })
    } else {
      this.setState({
        [name]: value
      })
    }
  }

  handleCheckBoxes = event => {
    const { id, checked } = event.target;
    const tree = id.split('-')[0];
    const name = id.split('-')[1];
    const eventId = id.split('-')[2];

    let list = this.state.stepTwo[`${name}`];

    let match = list.findIndex(item => {
      return item.id === Number(eventId)
    });

    list[match].checked = checked;
    
    let newState = { ...this.state[`${tree}`], [name]: list }

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
              <LessonPlanStepTwo currentStep={this.state.currentStep} handleChange={this.handleChange} handleCheckBoxes={this.handleCheckBoxes} formData={this.state.stepTwo} addToList={this.addToList} learningOutcome={this.state.learningOutcome} />
              <LessonPlanStepThree currentStep={this.state.currentStep} handleChange={this.handleChange} formData={this.state.stepThree} modules={modulesList} addToList={this.addToList} resource={this.state.resource} customForm={this.state.custom} addCustomModule={this.addCustomModule} addedCustom={this.state.addedCustom} />

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