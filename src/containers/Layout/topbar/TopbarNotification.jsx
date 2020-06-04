/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { Collapse } from 'reactstrap';
import { Link } from 'react-router-dom';
import NotificationsIcon from 'mdi-react/NotificationsIcon';
import { Confirmed } from '../../../components/Icons';

const notifications = [
  {
    ava: `${process.env.PUBLIC_URL}/img/topbar/ava.png`,
    message: 'Reached new 100 users',
    date: '09:02',
  },
  {
    ava: `${process.env.PUBLIC_URL}/img/topbar/ava.png`,
    message: 'You are good in Liquidity :)',
    date: '12:34',
  }
];

export default class TopbarNotification extends PureComponent {
    state = {
      collapse: false,
    };

  toggle = () => {
    this.setState({ collapse: !this.state.collapse });
  };

  render() {
    return (
      <div className="topbar__collapse">
        <button className="topbar__btn" onClick={this.toggle}>
          <Confirmed />
        </button>
        {this.state.collapse && <button className="topbar__back" onClick={this.toggle} />}
        <Collapse
          isOpen={this.state.collapse}
          className="topbar__collapse-content"
        >
          <div className="topbar__collapse-title-wrap">
            <p className="topbar__collapse-title">Notifications</p>
            <button className="topbar__collapse-button">Mark all as read</button>
          </div>
          {notifications.map((notification, index) => (
            <div className="topbar__collapse-item" key={index}>
              <div className="topbar__collapse-img-wrap">
                <img className="topbar__collapse-img" src={notification.ava} alt="" />
              </div>
              <p className="topbar__collapse-message">
                <span className="topbar__collapse-name">{notification.name}</span>
                {notification.message}
              </p>
              <p className="topbar__collapse-date">{notification.date}</p>
            </div>
          ))}
         
        </Collapse>
      </div>
    );
  }
}
