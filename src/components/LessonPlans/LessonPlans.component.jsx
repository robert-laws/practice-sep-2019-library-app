import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Container, Row, Col } from 'reactstrap';
import { Table } from 'reactstrap';

import { firestore } from '../../firebase/firebaseConfig';

class LessonPlans extends Component {
  state = {
    lessonsList: []
  }

  unsubscribeFromLessons = null;

  get lessonsRef() {
    return firestore.collection('lessons');
  }

  formatDate = myDate => {
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const date = new Date(myDate.seconds * 1000)
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  }

  componentDidMount = async () => {
    this.unsubscribeFromLessons = this.lessonsRef.onSnapshot(snapshot => {
      const lessons = snapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        }
      })

      this.setState({
        lessonsList: lessons
      })
    })
  }

  componentWillUnmount = () => {
    this.unsubscribeFromLessons();
  }

  render() {
    const { lessonsList } = this.state;

    return (
      <Container className='mt-3'>
        <Row>
          <Col sm="12">
            <h4>Lesson Plans</h4>
          </Col>
          <Col sm="12">
            <Link to='/lesson-plan-form'>Add a New Lesson Plan</Link>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col sm="12">
            <Table hover size='md'>
              <thead>
                <tr>
                  <th>Term</th>
                  <th>Class Name</th>
                  <th>Faculty</th>
                  <th>Librarian</th>
                  <th>Date</th>
                  <th>Start Time</th>
                  <th>Class Length</th>
                </tr>
              </thead>
              <tbody>
                {lessonsList.map(lesson => (
                  <tr key={lesson.id}>
                    <td>{lesson.term}</td>
                    <td><Link to={`/lesson-plan/${lesson.id}`}>{lesson.courseNumber} {lesson.courseTitle}</Link></td>
                    <td>{lesson.faculty}</td>
                    <td>{lesson.librarian}</td>
                    <td>{this.formatDate(lesson.date)}</td>
                    <td>{lesson.startTime}</td>
                    <td>{lesson.duration}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default LessonPlans;