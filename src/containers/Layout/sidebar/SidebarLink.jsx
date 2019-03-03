import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'reactstrap';
import { NavLink } from 'react-router-dom';

const SidebarLink = ({
  title, icon, newLink, route, onClick, disabled
}) => (
    <NavLink
        to={disabled ? '#' : route}
        onClick={onClick}
        activeClassName={disabled ? "" : "sidebar__link-active"}
    >
        <li style={{opacity : disabled ? 0.4 : 1}} className={disabled ? "sidebar__link__not_active" : "sidebar__link"}>
            {icon ? <span className={`sidebar__link-icon lnr lnr-${icon}`} /> : ''}
            {!disabled ? 
                <p className={"sidebar__link-title"}>
                {title}
                {newLink ? <Badge className="sidebar__link-badge"><span>New</span></Badge> : ''}
            </p>
            : null}
        </li>
    </NavLink>
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
