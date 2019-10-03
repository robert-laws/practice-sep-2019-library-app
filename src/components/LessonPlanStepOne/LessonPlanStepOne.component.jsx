import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { Alert } from 'reactstrap';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

import { firestore } from '../../firebase/firebaseConfig';

class LessonPlanStepOne extends Component {
  state = {
    term: '0',
    courseNumber: '0',
    courseTitle: '',
    faculty: '',
    librarian: '0',
    coInstructor: '',
    date: '',
    duration: '0',
    studentCount: '0',
    error: ''
  }

  durationIntervals = (start, finish, interval) => {
    let intervals = [];
    do {
      intervals.push(start);
      start = start + interval;
    }
    while(start <= finish)
    return intervals;
  }

  getCourseList = term => {
    const courseListing = this.props.courses.map(course => {
      if(course.term === term) {
        return <option key={course.id} value={course.courseNumber}>{course.courseNumber}</option>
      } else {
        return null;
      }
    })
    return courseListing;
  }

  getLibrariansList = () => {
    const librariansListing = this.props.librarians.map(librarian => {
      return <option key={librarian.id} value={librarian.name}>{librarian.name}</option>
    })
    return librariansListing;
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.courseNumber !== prevState.courseNumber) {
      const thisCourse = this.props.courses.filter(course => {
        return course.courseNumber === this.state.courseNumber
      })
  
      if(thisCourse.length > 0) {
        this.setState({
          faculty: thisCourse[0].faculty,
          courseTitle: thisCourse[0].courseTitle,
          courseNumber: this.state.courseNumber
        })
      } else {
        this.setState({
          faculty: '',
          courseTitle: '',
          courseNumber: this.state.courseNumber
        })
      }
    }
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit = async event => {
    event.preventDefault();

    const { term, courseNumber, courseTitle, faculty, librarian, coInstructor, date, duration, studentCount } = this.state;

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
      duration: lessonDuration,
      studentCount: lessonStudentCount
    }

    try {
      await lessonsRef.add(lesson);

      this.setState({
        term: '0',
        courseNumber: '0',
        courseTitle: '',
        faculty: '',
        librarian: '0',
        coInstructor: '',
        date: '',
        duration: '0',
        studentCount: '0',
        error: ''
      })
    } catch(error) {
      this.setState({
        error: error.message
      })
    }
  }

  render() {
    const { term, courseNumber, courseTitle, faculty, librarian, coInstructor, date, duration, studentCount, error } = this.state;

    return (
      <>
        <Card>
          <CardBody>
            <CardTitle>
              <h4>Step 1</h4>
              {error === '' ? '' : <Alert color='danger'>{error}</Alert>}
            </CardTitle>
            <Form onSubmit={this.handleSubmit}>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="term">Term</Label>
                    <Input type="select" name="term" id="term" value={term} onChange={this.handleChange}>
                      <option value="0">Make a Selection</option>
                      <option value="Fall 2019">Fall 2019</option>
                      <option value="Spring 2020">Spring 2020</option>
                      <option value="Summer 2020">Summer 2020</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="courseNumber">Course Number</Label>
                    <Input type="select" name="courseNumber" id="courseNumber" value={courseNumber} onChange={this.handleChange} disabled={term === '0'}>
                      <option value="0">Make a Selection</option>
                      {this.getCourseList(term)}
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="courseTitle">Course Title</Label>
                    <Input type="text" name="courseTitle" id="courseTitle" value={courseTitle} onChange={this.handleChange} readOnly={courseTitle === '0'} />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="faculty">Faculty Name</Label>
                    <Input type="text" name="faculty" id="faculty" value={faculty} onChange={this.handleChange} readOnly={courseNumber === '0'} />
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="librarian">Librarian</Label>
                    <Input type="select" name="librarian" id="librarian" value={librarian} onChange={this.handleChange}>
                      <option value="0">Make a Selection</option>
                      {this.getLibrariansList()}
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="coInstructor">Co-Instructor</Label>
                    <Input type="text" name="coInstructor" id="coInstructor" value={coInstructor} onChange={this.handleChange} placeholder='None' />
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={4}>
                  <FormGroup>
                    <Label for="date">Session Date</Label>
                    <Input type="date" name="date" id="date" placeholder="date placeholder" value={date} onChange={this.handleChange} />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="duration">Session Duration in Minutes</Label>
                    <Input type="select" name="duration" id="duration" value={duration} onChange={this.handleChange}>
                      <option value="0">Make a Selection</option>
                      {this.durationIntervals(5, 75, 5).map(interval => {
                        return <option key={interval} value={interval}>{interval}</option>
                      })}
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="studentCount">Number of Students</Label>
                    <Input type="select" name="studentCount" id="studentCount" value={studentCount} onChange={this.handleChange}>
                      <option value="0">Make a Selection</option>
                      {this.durationIntervals(1, 35, 1).map(interval => {
                        return <option key={interval} value={interval}>{interval}</option>
                      })}
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={12}>
                  <Button color='primary'>Next Step</Button>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </>
    )
  }
}

export default LessonPlanStepOne;

{/* <LessonPlanStepOne courses={courseList} librarians={librariansList} /> */}