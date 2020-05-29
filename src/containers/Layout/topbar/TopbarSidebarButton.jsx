import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Backoffice } from '../../../components/Icons'

const logo = `${process.env.PUBLIC_URL}/img/landing/logo-only.png`;

const Logo = styled.section`
    padding: 24px;
    height: 45px;
    width: 200px;
`;

class TopbarSidebarButton extends PureComponent {
    static propTypes = {
        changeMobileSidebarVisibility: PropTypes.func.isRequired,
        changeSidebarVisibility: PropTypes.func.isRequired,
    };

    render() {
        const { changeMobileSidebarVisibility, changeSidebarVisibility } = this.props;

        return (
        <div>
            <button disabled={true} className="topbar__button topbar__button--desktop" onClick={changeSidebarVisibility}>
                <Logo>
                    <Backoffice/>
                </Logo>
            </button>
            <button className="topbar__button topbar__button--mobile" onClick={changeMobileSidebarVisibility}>
            <img src={logo} alt="" className="topbar__button-icon" />
            </button>
        </div>
        );
    }
}

export default TopbarSidebarButton;
