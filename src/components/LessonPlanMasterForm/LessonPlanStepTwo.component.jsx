import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { FormGroup, Label, Input } from 'reactstrap';

class LessonPlanStepTwo extends Component {
  render() {
    if (this.props.currentStep !== 2) {
      return null;
    }

    return (
      <Card>
        <CardBody>
          <CardTitle>
            <h4>Step 2</h4>
          </CardTitle>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="two-1">Course Number</Label>
                <Input type="text" name="two-1" id="two-1" />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="two-2">Course Number</Label>
                <Input type="text" name="two-2" id="two-2" />
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
      </Card>
    )
  }
}

export default LessonPlanStepTwo;