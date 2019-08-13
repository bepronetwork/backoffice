import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const logo = `${process.env.PUBLIC_URL}/img/landing/logo-only.png`;

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
            <img src={logo} alt="" className="topbar__button-icon" />
            </button>
            <button className="topbar__button topbar__button--mobile" onClick={changeMobileSidebarVisibility}>
            <img src={logo} alt="" className="topbar__button-icon" />
            </button>
        </div>
        );
    }
}

export default TopbarSidebarButton;
