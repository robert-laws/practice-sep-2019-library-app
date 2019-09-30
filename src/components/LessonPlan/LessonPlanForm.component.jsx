import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { Alert } from 'reactstrap';
import { Card, CardBody } from 'reactstrap';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

class LessonPlanForm extends Component {
  state = {
    selectedTerm: '0',
    selectedNumber: '0',
    selectedTitle: '',
    selectedFaculty: '',
    selectedLibrarian: '0',
    selectedCoInstructor: 'None',
    selectedDate: '',
    selectedDuration: '',
    selectedStudents: '',
    courseListing: []
  }

  handleChange = event => {
    const coursesNumbers = this.props.courses.map(course => {
      if(course.term === event.target.value) {
        return <option key={course.id} value={course.number}>{course.number}</option>
      } else {
        return null;
      }
    })

    this.setState({
      selectedTerm: event.target.value,
      courseListing: coursesNumbers
    })
  }

  handleCourseChange = event => {
    const thisCourse = this.props.courses.filter(course => {
      return course.number === event.target.value
    })

    this.setState({
      selectedFaculty: thisCourse[0].faculty,
      selectedTitle: thisCourse[0].title,
      selectedNumber: event.target.value
    })
  }

  handleLibrarianChange = event => {
    this.setState({
      selectedLibrarian: event.target.value
    })
  }

  handleTextChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <>
        <Row>
          <Col sm="12">            
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <Form>
                  <Row form>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="term">Term</Label>
                        <Input type="select" name="term" id="term" value={this.state.selectedTerm} onChange={this.handleChange}>
                          <option value="0">Make a Selection</option>
                          <option value="Fall 2019">Fall 2019</option>
                          <option value="Spring 2020">Spring 2020</option>
                          <option value="Summer 2020">Summer 2020</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="number">Course Number</Label>
                        <Input type="select" name="number" id="number" value={this.state.selectedNumber} onChange={this.handleCourseChange}>
                          <option value="0">Make a Selection</option>
                          {this.state.courseListing}
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row form>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="title">Course Title</Label>
                        <Input type="text" name="title" id="title" value={this.state.selectedTitle} readOnly />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="faculty">Faculty</Label>
                        <Input type="text" name="faculty" id="faculty" value={this.state.selectedFaculty} readOnly />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row form>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="term">Librarian</Label>
                        <Input type="select" name="term" id="term" value={this.state.selectedLibrarian} onChange={this.handleLibrarianChange}>
                          <option value="0">Make a Selection</option>
                          <option value="Robert Laws">Robert Laws</option>
                          <option value="Paschalia Terzi">Paschalia Terzi</option>
                          <option value="Tatiana Usova">Tatiana Usova</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="selectedCoInstructor">Co-Instructor</Label>
                        <Input type="text" name="selectedCoInstructor" id="selectedCoInstructor" value={this.state.selectedCoInstructor} onChange={this.handleTextChange} />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row form>
                    <Col md={4}>
                      <FormGroup>
                        <Label for="selectedDate">Session Date</Label>
                        <Input type="date" name="selectedDate" id="selectedDate" placeholder="date placeholder" value={this.state.selectedTime} onChange={this.handleTextChange} />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label for="selectedDuration">Session Duration</Label>
                        <Input type="number" name="selectedDuration" id="selectedDuration" placeholder="duration placeholder" value={this.state.selectedDuration} onChange={this.handleTextChange} />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label for="selectedStudents">Number of Students</Label>
                        <Input type="number" name="selectedStudents" id="selectedStudents" value={this.state.selectedStudents} onChange={this.handleTextChange} />
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </>
    )
  }
}

export default LessonPlanForm;