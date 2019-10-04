import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { FormGroup, Label, Input } from 'reactstrap';

class LessonPlanStepOne extends Component {
  durationIntervals = (start, finish, interval) => {
    let intervals = [];
    do {
      intervals.push(start);
      start = start + interval;
    }
    while(start <= finish)
    return intervals;
  }

  timeIntervals = (start, end) => {
    let intervals = [];
    let minutes = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];
    for(let j = start; j <= end; j++) {
      for(let i = 0; i < minutes.length; i++) {
        intervals.push(`${j}:${minutes[i]}`);
      }
    }
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

  render() {
    if (this.props.currentStep !== 1) {
      return null;
    }

    const { term, courseNumber, courseTitle, faculty, librarian, coInstructor, date, startTime, duration, studentCount } = this.props.formData;

    return (
      <Card>
        <CardBody>
          <CardTitle>
            <h4>Step 1</h4>
          </CardTitle>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="term">Term</Label>
                <Input type="select" name="term" id="stepOne-term" value={term} onChange={this.props.handleChange}>
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
                <Input type="select" name="courseNumber" id="stepOne-courseNumber" value={courseNumber} onChange={this.props.handleChange} disabled={term === '0'}>
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
                <Input type="text" name="courseTitle" id="stepOne-courseTitle" value={courseTitle} onChange={this.props.handleChange} readOnly={courseNumber === '0'} />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="faculty">Faculty Name</Label>
                <Input type="text" name="faculty" id="stepOne-faculty" value={faculty} onChange={this.props.handleChange} readOnly={courseNumber === '0'} />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="librarian">Librarian</Label>
                <Input type="select" name="librarian" id="stepOne-librarian" value={librarian} onChange={this.props.handleChange}>
                  <option value="0">Make a Selection</option>
                  {this.getLibrariansList()}
                </Input>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="coInstructor">Co-Instructor</Label>
                <Input type="text" name="coInstructor" id="stepOne-coInstructor" value={coInstructor} onChange={this.props.handleChange} placeholder='None' />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={3}>
              <FormGroup>
                <Label for="date">Session Date</Label>
                <Input type="date" name="date" id="stepOne-date" placeholder="mm/dd/yy" value={date} onChange={this.props.handleChange} />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="startTime">Session Starting Time</Label>
                <Input type="select" name="startTime" id="stepOne-startTime" value={startTime} onChange={this.props.handleChange}>
                  <option value="0">Make a Selection</option>
                  {this.timeIntervals(8, 20).map(interval => {
                    return <option key={interval} value={interval}>{interval}</option>
                  })}
                </Input>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="duration">Session Duration in Minutes</Label>
                <Input type="select" name="duration" id="stepOne-duration" value={duration} onChange={this.props.handleChange}>
                  <option value="0">Make a Selection</option>
                  {this.durationIntervals(5, 75, 5).map(interval => {
                    return <option key={interval} value={interval}>{interval}</option>
                  })}
                </Input>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="studentCount">Number of Students</Label>
                <Input type="select" name="studentCount" id="stepOne-studentCount" value={studentCount} onChange={this.props.handleChange}>
                  <option value="0">Make a Selection</option>
                  {this.durationIntervals(1, 35, 1).map(interval => {
                    return <option key={interval} value={interval}>{interval}</option>
                  })}
                </Input>
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
      </Card>
    )
  }
}

export default LessonPlanStepOne;