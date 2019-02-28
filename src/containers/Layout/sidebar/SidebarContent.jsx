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
          <SidebarLink title="Developers" icon="code" route="/developers" onClick={this.hideSidebar} />

        </ul>
        <ul className="sidebar__block">
          <SidebarLink title="Log Out" icon="exit" route="/login" />
        </ul>
       
      </div>
    );
  }
}

export default SidebarContent;
