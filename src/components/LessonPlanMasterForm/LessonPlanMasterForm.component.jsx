import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { Button } from 'reactstrap';
import { Form } from 'reactstrap';

import courseList from '../../data/courseList';
import librariansList from '../../data/librariansList';
import modulesList from '../../data/modules';

import LessonPlanStepOne from './LessonPlanStepOne.component';
import LessonPlanStepTwo from './LessonPlanStepTwo.component';
import LessonPlanStepThree from './LessonPlanStepThree.component';
import LessonPlanStepFour from './LessonPlanStepFour.component';

import { firestore } from '../../firebase/firebaseConfig';

class LessonPlanMasterForm extends Component {
  state = {
    complete: true,
    error: '',
    currentStep: 1,
    learningOutcome: '',
    resource: '',
    custom: false,
    customModule: {
      customModuleId:'20',
      customModuleName:'',
      customTime: '',
      customConcepts: [],
      customFormConceptsGroupName: '',
      customFormConceptsGroupDetail: '',
      customFormConceptsGroupDetailEntry: '',
      customFormConceptsGroupDetailEntries: [],
    },
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
        {id: 4, name: 'Finding Journal Articles', checked: false},
        {id: 5, name: 'Finding/Using Multimedia Sources', checked: false},
        {id: 6, name: 'Gathering Data/Statistics', checked: false},
        {id: 7, name: 'Literature Review', checked: false},
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

  addToCustomModuleList = () => {
    let list = this.state.customModule.customFormConceptsGroupDetailEntries;
    let detail = this.state.customModule.customFormConceptsGroupDetailEntry;
    list = list.concat(detail);

    let newState = { ...this.state.customModule, customFormConceptsGroupDetailEntry: '', customFormConceptsGroupDetailEntries: list }

    this.setState({
      customModule: newState
    })
  }

  toggleComplete = () => {
    const myComplete = this.state.complete;

    this.setState({
      complete: !myComplete
    })
  }

  addCustomModule = () => {
    const groupName = this.state.customModule.customFormConceptsGroupName === '' ? 'none' : this.state.customModule.customFormConceptsGroupName;
    let concepts = this.state.customModule.customConcepts;
    const newId = this.state.customModule.customConcepts.length + 1;

    const newConcept = {
      id: newId,
      groupName: groupName,
      details: this.state.customModule.customFormConceptsGroupDetailEntries
    }
    concepts = concepts.concat(newConcept);

    let myModule = {
      id: this.state.customModule.customModuleId,
      moduleName: this.state.customModule.customModuleName,
      time: this.state.customModule.customTime,
      concepts: concepts
    }

    let modules = this.state.stepThree.modules;
    modules = modules.concat(myModule);
        
    let newModuleState = {
      customModuleId:'20',
      customModuleName:'',
      customTime: '',
      customConcepts: [],
      customFormConceptsGroupName: '',
      customFormConceptsGroupDetail: '',
      customFormConceptsGroupDetailEntry: '',
      customFormConceptsGroupDetailEntries: [],
    }

    let newState = { ...this.state.stepThree, moduleName: '0', modules }

    this.setState({
      customModule: newModuleState,
      stepThree: newState,
      custom: false
    })
  }

  addCustomModuleSection = () => {
    const groupName = this.state.customModule.customFormConceptsGroupName === '' ? 'none' : this.state.customModule.customFormConceptsGroupName;
    const newId = this.state.customModule.customConcepts.length + 1;

    let mySubsection = {
      id: newId,
      groupName: groupName,
      details: this.state.customModule.customFormConceptsGroupDetailEntries
    }

    let concepts = this.state.customModule.customConcepts;
    concepts = concepts.concat(mySubsection);

    let newModuleState = {
      customModuleId: '20',
      customModuleName: this.state.customModule.customModuleName,
      customTime: this.state.customModule.customTime,
      customConcepts: concepts,
      customFormConceptsGroupName: '',
      customFormConceptsGroupDetail: '',
      customFormConceptsGroupDetailEntry: '',
      customFormConceptsGroupDetailEntries: [],
    }

    this.setState({
      customModule: newModuleState
    })
  }

  cancelCustomModule = () => {
    let newModuleState = {
      customModuleId:'20',
      customModuleName:'',
      customTime: '',
      customConcepts: [],
      customFormConceptsGroupName: '',
      customFormConceptsGroupDetail: '',
      customFormConceptsGroupDetailEntry: '',
      customFormConceptsGroupDetailEntries: [],
    }

    this.setState({
      customModule: newModuleState,
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
    currentStep = currentStep >= 3 ? 4 : currentStep + 1;

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

  handleSubmit = async event => {
    this.toggleComplete();
    
    event.preventDefault();

    const { term, courseNumber, courseTitle, faculty, librarian, coInstructor, date, startTime, duration, studentCount } = this.state.stepOne
    const { classAssignment, learningOutcomes, informationLiteracy, thresholdConcepts } = this.state.stepTwo;
    const { modules, resources } = this.state.stepThree;

    const lessonDuration = Number(duration);
    const lessonStudentCount = Number(studentCount);
    const lessonDate = new Date(date);

    const lessonsRef = firestore.collection('lessons');

    const lesson = {
      term,
      courseNumber,
      courseTitle,
      faculty,
      librarian,
      coInstructor,
      date: lessonDate,
      startTime,
      duration: lessonDuration,
      studentCount: lessonStudentCount,
      classAssignment,
      learningOutcomes,
      informationLiteracy,
      thresholdConcepts,
      resources,
      modules
    }

    try {
      await lessonsRef.add(lesson);

      this.props.history.push('/lesson-plans')
    } catch(error) {
      this.setState({
        error: error.message
      })
    }

    this.toggleComplete();
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
    if(currentStep < 4) {
      return (
        <Button color='secondary' onClick={this._next}>{currentStep !== 3 ? 'Next Step' : 'Final Step - Review and Submit'}</Button>
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
              <LessonPlanStepThree currentStep={this.state.currentStep} handleChange={this.handleChange} formData={this.state.stepThree} modules={modulesList} addToList={this.addToList} resource={this.state.resource} customForm={this.state.custom} addToCustomModuleList={this.addToCustomModuleList} addCustomModule={this.addCustomModule} addCustomModuleSection={this.addCustomModuleSection} cancelCustomModule={this.cancelCustomModule} customModuleData={this.state.customModule} />
              <LessonPlanStepFour currentStep={this.state.currentStep} stepOneData={this.state.stepOne} stepTwoData={this.state.stepTwo} stepThreeData={this.state.stepThree} complete={this.state.complete} />

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

export default withRouter(LessonPlanMasterForm);