import React from 'react';
import { Card, CardBody, Col, Button } from 'reactstrap';
import MessageTextOutlineIcon from 'mdi-react/MessageTextOutlineIcon';

const bpro = `${process.env.PUBLIC_URL}/img/casinoprotocol.png`;

const ProfileContainer = () => (
  <Col md={12} lg={12} xl={12}>
    <Card>
      <CardBody className="profile__card">
        <div className="profile__information">
          <div className="profile__avatar">
            <img src={bpro} alt="bpro" />
          </div>
          <div className="profile__data">
            <p className="profile__work">Casino Protocol</p>
            <p className="profile__contact">Casinos</p>
            <Button color="primary" className="icon profile__btn"><p> Edit</p></Button>
          </div>
        </div>
        <div className="profile__stats">
          <div className="profile__stat">
            <p className="profile__stat-number">3245</p>
            <p className="profile__stat-title">New Users</p>
          </div>
          <div className="profile__stat">
            <p className="profile__stat-number">23413</p>
            <p className="profile__stat-title">Bet Volume</p>
          </div>
          <div className="profile__stat">
            <p className="profile__stat-number">3</p>
            <p className="profile__stat-title">Reports</p>
          </div>
        </div>
      </CardBody>
    </Card>
  </Col>
);

export default ProfileContainer;
