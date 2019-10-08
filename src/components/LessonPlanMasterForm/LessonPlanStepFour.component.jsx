import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { Button, Spinner } from 'reactstrap';
import { Table } from 'reactstrap';

class LessonPlanStepFour extends Component {
  render() {
    if (this.props.currentStep !== 4) {
      return null;
    }

    const { term, courseNumber, courseTitle, faculty, librarian, coInstructor, date, startTime, duration, studentCount } = this.props.stepOneData
    const { classAssignment, learningOutcomes, informationLiteracy, thresholdConcepts } = this.props.stepTwoData;
    const { modules, resources } = this.props.stepThreeData;

    return (
      <Card>
        <CardBody>
          <CardTitle>
            <h4>Step 4 - Review the Lesson Plan</h4>
          </CardTitle>
          <Row>
            <Col md={12}>
              <hr />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <h5>{term} Library Instruction</h5>
              <p>Course: {courseNumber}: {courseTitle}</p>
              <p>Faculty: {faculty}</p>
              <p>Librarian: {librarian} {coInstructor !== '' ? `</p><p> Co-instructor: ${coInstructor}` : ''}</p>
              <hr />
              <h5>Instruction Information</h5>
              <p>Date: {date}</p>
              <p>Class start time: {startTime}</p>
              <p>Class length: {duration}</p>
              <p>Students in class: {studentCount}</p>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <hr />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <h5>Instruction Details</h5>
              <p>Class Assignment: {classAssignment}</p>
              <p><strong>Learning Outcomes:</strong></p>
              <ul>
                {learningOutcomes.map((outcome, index) => {
                  return <li key={index}>{outcome}</li>
                })}
              </ul>
              <p><strong>Applied Information Literacy Concepts:</strong></p>
              <ul>
                {informationLiteracy.map((concept, index) => {
                  if(concept.checked === true) {
                    return <li key={index}>{concept.name}</li>
                  } else {
                    return null
                  }
                })}
              </ul>
              <p><strong>Applied ALA Threshold Concepts Concepts:</strong></p>
              <ul>
                {thresholdConcepts.map((concept, index) => {
                  if(concept.checked === true) {
                    return <li key={index}>{concept.name}</li>
                  } else {
                    return null
                  }
                })}
              </ul>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <hr />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <h5>Detailed Instruction Plan</h5>
              <Table className='modulesTable' bordered>
                <thead>
                  <tr>
                    <th>Module Details</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {modules.map(module => {
                    return (
                      <tr key={module.id}>
                        <td>
                          <h6>{module.moduleName}</h6>
                          {module.concepts.map(concept => {
                            if(concept.groupName !== 'none') {
                              return (
                                <div key={concept.id} className='modulesTableConcepts'>
                                  <p className='modulesTableGroupName'>
                                    <strong>{concept.groupName}</strong>
                                  </p>
                                  <ul>
                                    {concept.details.map((detail, index) => {
                                      return <li key={index}>{detail}</li>
                                    })}
                                  </ul>
                                </div>
                              )
                            } else {
                              return (
                                <div key={concept.id} className='modulesTableConcepts'>
                                  <ul>
                                    {concept.details.map((detail, index) => {
                                      return <li key={index}>{detail}</li>
                                    })}
                                  </ul>
                                </div>
                              )
                            }
                          })}
                        </td>
                        <td>{module.time}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
              <h5>Resources Used</h5>
              <ul>
                {resources.map((resource, index) => {
                  return <li key={index}>{resource}</li>
                })}
              </ul>
            </Col>
          </Row>
          <Row form>
            <Col md={12} className='text-right'>
              <Button color="primary">
                {this.props.complete ? `Submit Lesson Plan` : <Spinner color="light" size="sm" />}
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    )
  }
}

export default LessonPlanStepFour;