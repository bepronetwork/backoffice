import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { ButtonBase } from '@material-ui/core';

const Icon = styled.section`
    height: 24px;
    width: 24px;
`;

const SidebarLink = ({
  title, icon, newLink, route, onClick, disabled
}) => (
    <ButtonBase>
        <NavLink
            to={disabled ? '#' : route}
            onClick={onClick}
            activeClassName={disabled ? "sidebar__link__not_active" : "sidebar__link-active"}
        >

            <div style={{ opacity : disabled ? 0.4 : 1 }} className={disabled ? "sidebar__link__not_active" : "sidebar__link"}>
                <Icon>
                    {icon}
                </Icon>
                {!disabled ? 
                    <p className={"sidebar__link-title"}>
                    {title}
                </p>
                : null}
            </div>
        </NavLink>
    </ButtonBase>
);

SidebarLink.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
    newLink: PropTypes.bool,
    route: PropTypes.string,
    onClick: PropTypes.func,
};

SidebarLink.defaultProps = {
    icon: '',
    newLink: false,
    route: '/',
    onClick: () => {},
};

export default SidebarLink;
