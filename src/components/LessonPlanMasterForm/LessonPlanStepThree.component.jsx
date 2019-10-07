import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { FormGroup, Label, Input, Button } from 'reactstrap';
import { Table } from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';

import durationIntervals from '../../utilities/durationIntervals';

class LessonPlanStepThree extends Component {
  getModulesList = () => {
    const modulesListing = this.props.modules.map(module => {
      return <option key={module.id} value={module.moduleName}>{module.moduleName}</option>
    })
    return modulesListing;
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }

  render() {
    if (this.props.currentStep !== 3) {
      return null;
    }

    const resource = this.props.resource;
    const customForm = this.props.customForm;
    const { moduleName, modules, resources } = this.props.formData;
    const { customModuleName, customTime, customFormConceptsGroupName, customFormConceptsGroupDetailEntry, customFormConceptsGroupDetailEntries } = this.props.customModuleData;

    return (
      <Card>
        <CardBody>
          <CardTitle>
            <h4>Step 3</h4>
          </CardTitle>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="moduleName">Choose a Module (in Minutes)</Label>
                <Input type="select" name="moduleName" id="stepThree-moduleName" value={moduleName} onChange={this.props.handleChange}>
                  <option value="0">Add a New Module</option>
                  <option value="custom">Custom Module</option>
                  {this.getModulesList()}
                </Input>
              </FormGroup>
            </Col>
          </Row>          
          {customForm ? 
            (
              <Row form className='customForm'>
                <Col md={12}>
                  <h6>Add a Custom Module</h6>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for='customModuleName' className='biggerLabel'>Custom Module Name</Label>
                    <Input type="text" name="customModuleName" id="customModule-customModuleName" value={customModuleName} onChange={this.props.handleChange} placeholder='Enter a Custom Module Name' />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="customTime" className='biggerLabel'>Time for Custom Module</Label>
                    <Input type="select" name="customTime" id="customModule-customTime" value={customTime} onChange={this.props.handleChange}>
                    <option value="0">Make a Selection</option>
                    {durationIntervals(5, 35, 5).map(interval => {
                      return <option key={interval} value={interval}>{interval}</option>
                    })}
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={12}>
                  <FormGroup>
                    <Label for="customFormConceptsGroupName" className='biggerLabel'>Custom Module Subsection Name (if applicable)</Label>
                    <Input type="text" name="customFormConceptsGroupName" id="customModule-customFormConceptsGroupName" value={customFormConceptsGroupName} onChange={this.props.handleChange} placeholder='Enter a Name for Custom Module (if applicable)' />
                  </FormGroup>
                </Col>
                <Col md={10}>
                  <FormGroup>
                    <Label for="customFormConceptsGroupDetailEntry" className='biggerLabel'>Add a Module Details</Label>
                    <Input type="text" name="customFormConceptsGroupDetailEntry" id="customModule-customFormConceptsGroupDetailEntry" value={customFormConceptsGroupDetailEntry} onChange={this.props.handleChange} placeholder='Enter a Module Detail' />
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <Button className='button-margin' id='addModuleDetail' onClick={this.props.addToCustomModuleList}>Add Detail</Button>
                </Col>
                <Col md={12}>
                  <ListGroup className='learningOutcomesList'>                
                    {customFormConceptsGroupDetailEntries.map((detail, index) => {
                      return <ListGroupItem key={index}>{detail}</ListGroupItem>
                    })}
                  </ListGroup>
                </Col>
                <Col md={12} className='text-right'>
                  <Button color='primary' onClick={this.props.addCustomModule}>Add Custom Module to Lesson</Button>{' '}
                  <Button color='primary' onClick={this.props.addCustomModuleSection}>Save Section and Add Another</Button>{' '}
                  <Button color='secondary' onClick={this.props.cancelCustomModule}>Cancel</Button>
                </Col>
              </Row>
            ) : ''}
          <Row form>
            <Col md={12}>
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
            </Col>
          </Row>
          <Row form>
            <Col md={10}>
              <FormGroup>
                <Label for="resource" className='biggerLabel'>Resources Used</Label>
                <Input type="text" name="resource" id="resource" value={resource} onChange={this.props.handleChange} placeholder='Enter a Resource Used' />
              </FormGroup>
            </Col>
            <Col md={2}>
              <Button className='button-margin' id='stepThree-resources' onClick={this.props.addToList}>Add Resource</Button>
            </Col>
          </Row>
          <Row form>
            <Col md={12}>
              <ListGroup className='learningOutcomesList'>                
                {resources.map((resource, index) => {
                  return <ListGroupItem key={index}>{resource}</ListGroupItem>
                })}
              </ListGroup>
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