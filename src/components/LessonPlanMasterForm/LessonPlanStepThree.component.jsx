import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { FormGroup, Label, Input, Button } from 'reactstrap';
import { Table } from 'reactstrap';

class LessonPlanStepThree extends Component {

  getModulesList = () => {
    const modulesListing = this.props.modules.map(module => {
      return <option key={module.id} value={module.moduleName}>{module.moduleName}</option>
    })
    return modulesListing;
  }

  render() {
    if (this.props.currentStep !== 3) {
      return null;
    }

    const { moduleName, modules } = this.props.formData;

    return (
      <Card>
        <CardBody>
          <CardTitle>
            <h4>Step 3</h4>
          </CardTitle>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="moduleName">Choose a Module</Label>
                <Input type="select" name="moduleName" id="stepThree-moduleName" value={moduleName} onChange={this.props.handleChange}>
                  <option value="0">Add a New Module</option>
                  <option value="custom">Custom Module</option>
                  {this.getModulesList()}
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={12}>
              <Table className='modulesTable'>
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