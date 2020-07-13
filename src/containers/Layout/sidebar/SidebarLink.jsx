import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { ChevronRightIcon } from 'mdi-react';


const Icon = styled.section`
    height: 24px;
    width: 24px;
`;

// const LeftIcon = styled.section`
//     display: flex;
//     margin-left: 50px;
//     align-items: center;
//     height: 30px;
//     color: #4b2019;
//     opacity: 0.29;
// `;

const SidebarLink = ({
  title, icon, newLink, route, onClick, disabled
}) => (
    <NavLink
        to={disabled ? '#' : route}
        onClick={onClick}
        activeClassName={disabled ? "" : "sidebar__link-active"}
    >

        <li style={{opacity : disabled ? 0.4 : 1 }} className={disabled ? "sidebar__link__not_active" : "sidebar__link"}>
            {/* {icon ? <span className={`sidebar__link-icon lnr lnr-${icon}`} /> : ''} */}
            <Icon>
                {icon}
            </Icon>
            {!disabled ? 
                <p className={"sidebar__link-title"}>
                {title}
                {newLink ? <Badge className="sidebar__link-badge"><span>New</span></Badge> : ''}
                {/* <LeftIcon>
                    <ChevronRightIcon />
                </LeftIcon> */}
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
