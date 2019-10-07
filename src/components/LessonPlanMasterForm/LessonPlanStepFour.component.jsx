import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { Button } from 'reactstrap';

class LessonPlanStepFour extends Component {
  render() {
    if (this.props.currentStep !== 4) {
      return null;
    }

    return (
      <Card>
        <CardBody>
          <CardTitle>
            <h4>Step 4</h4>
          </CardTitle>
          <Row form>
            <Col md={12} className='text-right'>
              <Button color='primary'>Review and Submit</Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    )
  }
}

export default LessonPlanStepFour;