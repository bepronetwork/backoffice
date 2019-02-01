import React from 'react';
import { Card, Col } from 'reactstrap';
import Inbox from './Inbox';
import emails from './email-list';

const InboxCard = () => (
  <Col md={12} lg={12}>
    <Card>
      <Inbox emails={emails} />
    </Card>
  </Col>
);

export default InboxCard;
