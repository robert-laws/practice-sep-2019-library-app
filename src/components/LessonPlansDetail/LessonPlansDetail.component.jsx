import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { Container, Row, Col } from 'reactstrap';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { Table } from 'reactstrap';

import { firestore } from '../../firebase/firebaseConfig';

class LessonPlanDetail extends Component {
  state = {
    term: '',
    courseNumber: '',
    courseTitle: '',
    faculty: '',
    librarian: '',
    coInstructor: '',
    date: '',
    startTime: '',
    duration: '',
    studentCount: '',
    classAssignment: '',
    learningOutcomes: [],
    informationLiteracy: [],
    thresholdConcepts: [],
    modules: [],
    resources: []
  }

  formatDate = myDate => {
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const date = new Date(myDate.seconds * 1000)
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  }

  componentDidMount = async () => {
    const docName = this.props.match.params.docName;
    const lessonRef = firestore.collection('lessons').doc(docName);
    const lessonData = await lessonRef.get();

    const { term, courseNumber, courseTitle, faculty, librarian, coInstructor, date, startTime, duration, studentCount, classAssignment, learningOutcomes, informationLiteracy, thresholdConcepts, modules, resources } = lessonData.data();

    this.setState({
      term,
      courseNumber,
      courseTitle,
      faculty,
      librarian,
      coInstructor,
      date,
      startTime,
      duration,
      studentCount,
      classAssignment,
      learningOutcomes,
      informationLiteracy,
      thresholdConcepts,
      modules,
      resources
    })
  }

  render() {
    const { term, courseNumber, courseTitle, faculty, librarian, coInstructor, date, startTime, duration, studentCount, classAssignment, learningOutcomes, informationLiteracy, thresholdConcepts, modules, resources } = this.state;

    return (
      <Container>
        <Row>
          <Col md={12}>
            <Card className='m-3'>
              <CardBody>
                <CardTitle>
                  <h4>Lesson Plan Details - {term}</h4>
                </CardTitle>
                <Row>
                  <Col md={12}>
                    <hr />
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <p><strong>Course:</strong> {courseNumber}: {courseTitle}</p>
                    <p><strong>Faculty:</strong> {faculty}</p>
                    <p><strong>Librarian:</strong> {librarian} {coInstructor !== '' ? `</p><p> Co-instructor: ${coInstructor}` : ''}</p>
                    <hr />
                    <h5>Instruction Information</h5>
                    <p><strong>Date:</strong> {this.formatDate(date)}</p>
                    <p><strong>Class start time:</strong> {startTime}</p>
                    <p><strong>Class length:</strong> {duration}</p>
                    <p><strong>Students in class:</strong> {studentCount}</p>
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
                    <p><strong>Class Assignment:</strong> {classAssignment}</p>
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
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default withRouter(LessonPlanDetail);