import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SidebarLink from './SidebarLink';
import SidebarCategory from './SidebarCategory';

class SidebarContent extends Component {
  static propTypes = {
    changeToDark: PropTypes.func.isRequired,
    changeToLight: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  hideSidebar = () => {
    this.props.onClick();
  };

  render() {
    return (
      <div className="sidebar__content">
        <ul className="sidebar__block">
          <SidebarLink title="Home" icon="home" route="/home" onClick={this.hideSidebar} />
          <SidebarLink title="Application" icon="laptop-phone" route="/application" onClick={this.hideSidebar} />
          <SidebarLink title="Users" icon="users" route="/users" onClick={this.hideSidebar} />
          <SidebarLink title="Stats" icon="chart-bars" route="/stats" onClick={this.hideSidebar} />
          <SidebarLink title="Wallet" icon="store" route="/wallet" onClick={this.hideSidebar} />
          <SidebarLink title="Affiliates" icon="gift" route="/affiliates" onClick={this.hideSidebar} />

        </ul>
       <ul className="sidebar__block">
          <SidebarCategory title="Account" icon="user">
            <SidebarLink title="Email Confirmation" route="/account/email_confirmation" />
            <SidebarLink title="Lock Screen" route="/lock_screen" />
            <SidebarLink title="Log In" route="/log_in" />
            <SidebarLink title="Log In Photo" route="/log_in_photo" />
            <SidebarLink title="Profile" route="/account/profile" onClick={this.hideSidebar} />
            <SidebarLink title="Register" route="/register" />
            <SidebarLink title="Register Photo" route="/register_photo" />
          </SidebarCategory>
        </ul>
        <ul className="sidebar__block">
          <SidebarLink title="Log Out" icon="exit" route="/log_in" />
        </ul>
       
      </div>
    );
  }
}

export default SidebarContent;
