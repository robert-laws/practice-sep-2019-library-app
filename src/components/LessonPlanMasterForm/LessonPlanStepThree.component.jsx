import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { FormGroup, Label, Input, Button } from 'reactstrap';

class LessonPlanStepThree extends Component {
  render() {
    if (this.props.currentStep !== 3) {
      return null;
    }

    return (
      <Card>
        <CardBody>
          <CardTitle>
            <h4>Step 3</h4>
          </CardTitle>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="three-1">Course Number</Label>
                <Input type="text" name="three-1" id="three-1" />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="three-2">Course Number</Label>
                <Input type="text" name="three-2" id="three-2" />
              </FormGroup>
            </Col>
          </Row>
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

export default LessonPlanStepThree;