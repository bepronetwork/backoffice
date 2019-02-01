import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import Calendar from '../../../../shared/components/Calendar';
import events from './events';

const BigCalendar = () => (
  <Col md={12} lg={12} xl={9}>
    <Card>
      <CardBody>
        <Calendar events={events} />
      </CardBody>
    </Card>
  </Col>
);

export default BigCalendar;
