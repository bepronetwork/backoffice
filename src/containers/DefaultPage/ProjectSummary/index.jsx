import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import Summary from './components/Summary';
import ProjectTeam from './components/ProjectTeam';

const ProjectSummary = () => (
  <Container>
    <Row>
      <Col md={12}>
        <h3 className="page-title">Project Summary</h3>
        <h3 className="page-subhead subhead">Use this elements, if you want to show some hints or additional
              information
        </h3>
      </Col>
    </Row>
    <Row>
      <Summary />
      <ProjectTeam />
    </Row>
  </Container>
);

export default ProjectSummary;
