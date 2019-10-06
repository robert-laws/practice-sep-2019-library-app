import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { FormGroup, Label, Input, CustomInput, Button } from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';

class LessonPlanStepTwo extends Component {
  render() {
    if (this.props.currentStep !== 2) {
      return null;
    }

    const currentOutcome = this.props.currentOutcome;
    const { classAssignment, learningOutcomes, informationLiteracy, thresholdConcepts } = this.props.formData;

    return (
      <Card>
        <CardBody>
          <CardTitle>
            <h4>Step 2</h4>
          </CardTitle>
          <Row form>
            <Col md={12}>
              <FormGroup>
                <Label for="classAssignment" className='biggerLabel'>Class Assignment</Label>
                <Input type="textarea" name="classAssignment" id="stepTwo-classAssignment" value={classAssignment} onChange={this.props.handleChange} />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={10}>
              <FormGroup>
                <Label for="currentOutcome" className='biggerLabel'>Learning Outcomes</Label>
                <Input type="text" name="currentOutcome" id="currentOutcome" value={currentOutcome} onChange={this.props.handleChange} placeholder='Enter a Learning Outcome' />
              </FormGroup>
            </Col>
            <Col md={2}>
              <Button className='button-margin' onClick={this.props.addOutcome}>Add Outcome</Button>
            </Col>
          </Row>
          <Row form>
            <Col md={12}>
              <ListGroup className='learningOutcomesList'>                
                {learningOutcomes.map((outcome, index) => {
                  return <ListGroupItem key={index}>{outcome}</ListGroupItem>
                })}
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
            <FormGroup>
              <Label for="informationLiteracy" className='biggerLabel'>Information Literacy Objectives</Label>
              <div>
                {informationLiteracy.map(infoLit => {
                  return <CustomInput key={infoLit.id} type="checkbox" id={`stepTwo-informationLiteracy-${infoLit.id}`} name='informationLiteracy' label={infoLit.name} onChange={this.props.handleCheckBoxes} checked={infoLit.checked} />
                })}
              </div>
            </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
            <FormGroup>
              <Label for="thresholdConcepts" className='biggerLabel'>Threshold Concepts</Label>
              <div>
                {thresholdConcepts.map(concept => {
                  return <CustomInput key={concept.id} type="checkbox" id={`stepTwo-thresholdConcepts-${concept.id}`} name='thresholdConcepts' label={concept.name} onChange={this.props.handleCheckBoxes} checked={concept.checked} />
                })}
              </div>
            </FormGroup>
            </Col>
          </Row>
        </CardBody>
      </Card>
    )
  }
}

export default LessonPlanStepTwo;