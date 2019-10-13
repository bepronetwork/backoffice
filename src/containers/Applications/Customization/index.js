import React, { Component } from 'react'
import { Col, Container, Row, Card, CardBody, Button } from 'reactstrap';
import AnnouncementTabSettings from './components/AnnouncementTabSettings';

export default class CustmoizationContainer extends Component {
    render() {
        return (
            <Container className="dashboard">
            <p className="dashboard__visitors-chart-title text-left" style={{fontSize : 18, marginBottom : 10}}> Customization Settings </p>
            <hr></hr>
            <Row>
                <Col lg={12}>
                    <AnnouncementTabSettings />
                </Col>
            </Row>
      </Container>
        )
    }
}

