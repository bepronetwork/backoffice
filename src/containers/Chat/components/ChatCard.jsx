import React from 'react';
import { Card, Col } from 'reactstrap';
import Chat from './Chat';
import myContacts from './contacts';

const ChatCard = () => (
  <Col md={12} lg={12}>
    <Card>
      <Chat
        contacts={myContacts}
        currentUser={{
          avatar: `${process.env.PUBLIC_URL}/img/ava.png`,
          name: 'Rui Teixeira',
          userName: 'dragonKing',
        }}
      />
    </Card>
  </Col>
);

export default ChatCard;
