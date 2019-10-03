import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { FormGroup, Label, Input, Button } from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';

class LessonPlanStepTwo extends Component {
  state = {
    currentOutcome: ''
  }

  handleChange = event => {
    const { name, value } = event.target;    
    this.setState({
      [name]: value
    })
  }

  render() {
    if (this.props.currentStep !== 2) {
      return null;
    }

    const { currentOutcome } = this.state;
    const { classAssignment, learningOutcomes } = this.props.formData;

    return (
      <Card>
        <CardBody>
          <CardTitle>
            <h4>Step 2</h4>
          </CardTitle>
          <Row form>
            <Col md={12}>
              <FormGroup>
                <Label for="classAssignment">Class Assignment</Label>
                <Input type="textarea" name="classAssignment" id="stepTwo-classAssignment" value={classAssignment} onChange={this.props.handleChange} />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={10}>
              <FormGroup>
                <Label for="currentOutcome">Learning Outcomes</Label>
                <Input type="text" name="currentOutcome" id="currentOutcome" value={currentOutcome} onChange={this.handleChange} />
              </FormGroup>
            </Col>
            <Col md={2}>
              <Button className='button-margin' onClick={() => this.props.addOutcome(currentOutcome)}>Add Outcome</Button>
            </Col>
          </Row>
          <Row form>
            <Col md={12}>
              <ListGroup>                
                {learningOutcomes.map((outcome, index) => {
                  return <ListGroupItem key={index}>{outcome}</ListGroupItem>
                })}
              </ListGroup>
            </Col>
          </Row>
        </CardBody>
      </Card>
    )
  }
}

export default LessonPlanStepTwo;