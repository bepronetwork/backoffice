import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import BigCalendar from './components/BigCalendar';
import EventLabels from './components/EventLabels';

const Calendar = () => (
  <Container>
    <Row>
      <Col md={12}>
        <h3 className="page-title">Calendar</h3>
        <h3 className="page-subhead subhead">Use this elements, if you want to show some hints or additional
              information
        </h3>
      </Col>
    </Row>
    <Row>
      <BigCalendar />
      <EventLabels />
    </Row>
  </Container>
);

export default Calendar;
