/* eslint-disable no-return-assign */
import React, { Component, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import NotificationSystem from 'rc-notification';
import Topbar from './topbar/Topbar';
import TopbarWithNavigation from './topbar_with_navigation/TopbarWithNavigation';
import Sidebar from './sidebar/Sidebar';
import SidebarMobile from './topbar_with_navigation/sidebar_mobile/SidebarMobile';
import Customizer from './customizer/Customizer';
import { BasicNotification } from '../../shared/components/Notification';
import { changeMobileSidebarVisibility, changeSidebarVisibility } from '../../redux/actions/sidebarActions';
import { changeThemeToDark, changeThemeToLight } from '../../redux/actions/themeActions';
import { changeBorderRadius, toggleBoxShadow, toggleTopNavigation } from '../../redux/actions/customizerActions';
import { CustomizerProps, SidebarProps, ThemeProps } from '../../shared/prop-types/ReducerProps';

let notification = null;

const showNotification = () => {
  notification.notice({
    content: <BasicNotification
      title="👋 Welcome to BetProtocol"
      message="You have successfully registered in the BPRO. Now you can start to explore the BackOffice. Enjoy!"
    />,
    duration: 5,
    closable: true,
    style: { top: 0, left: 'calc(100vw - 100%)' },
    className: 'right-up',
  });
};

const Layout = ({ dispatch, customizer, sidebar, theme }) => {

  useEffect(() => {
    NotificationSystem.newInstance({}, n => notification = n);
    setTimeout(() => showNotification(), 700);
    
    return function clearNotification() {
      if (notification) {
        notification.destroy();
      }
    }
  }, [])

  const changeSidebarVisibility = () => {
    dispatch(changeSidebarVisibility());
  };

  const changeMobileSidebarVisibility = () => {
    dispatch(changeMobileSidebarVisibility());
  };

  const changeToDark = () => {
    dispatch(changeThemeToDark());
  };

  const changeToLight = () => {
    dispatch(changeThemeToLight());
  };

  const toggleTopNavigation = () => {
    dispatch(toggleTopNavigation());
  };

  const changeBorderRadius = () => {
    dispatch(changeBorderRadius());
  };

  const toggleBoxShadow = () => {
    dispatch(toggleBoxShadow());
  };

  const layoutClass = classNames({
      layout: true,
      'layout--collapse': sidebar.collapse,
      'layout--top-navigation': customizer.topNavigation,
  });

    return (
      <div className={layoutClass}>

        {/* <Customizer
          customizer={customizer}
          sidebar={sidebar}
          theme={theme}
          changeSidebarVisibility={this.changeSidebarVisibility}
          toggleTopNavigation={this.toggleTopNavigation}
          changeToDark={this.changeToDark}
          changeToLight={this.changeToLight}
          changeBorderRadius={this.changeBorderRadius}
          toggleBoxShadow={this.toggleBoxShadow}
        />
        */}
        {customizer.topNavigation ?
          <TopbarWithNavigation
            changeMobileSidebarVisibility={changeMobileSidebarVisibility}
          /> :
          <Topbar
            changeMobileSidebarVisibility={changeMobileSidebarVisibility}
            changeSidebarVisibility={changeSidebarVisibility}
          />
        }
        {customizer.topNavigation ?
          <SidebarMobile
            sidebar={sidebar}
            changeToDark={changeToDark}
            changeToLight={changeToLight}
            changeMobileSidebarVisibility={changeMobileSidebarVisibility}
          /> :
          <Sidebar
            sidebar={sidebar}
            changeToDark={changeToDark}
            changeToLight={changeToLight}
            changeMobileSidebarVisibility={changeMobileSidebarVisibility}
          />
        }
      </div>
    );
}

export default withRouter(connect(state => ({
  customizer: state.customizer,
  sidebar: state.sidebar,
  theme: state.theme,
}))(Layout));
