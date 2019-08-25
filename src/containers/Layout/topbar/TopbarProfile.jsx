import React, { PureComponent } from 'react';
import DownIcon from 'mdi-react/ChevronDownIcon';
import { Collapse } from 'reactstrap';
import TopbarMenuLink from './TopbarMenuLink';

import { connect } from "react-redux";
import PropTypes from 'prop-types';
import Cache from '../../../services/cache';

const Ava = `${process.env.PUBLIC_URL}/img/dashboard/ava.png`;

class TopbarProfile extends PureComponent {
	constructor() {
		super();
		this.state = {
		    collapse: false,
		};
	}

	toggle = () => {
		this.setState({ collapse: !this.state.collapse });
    };
    
    logout = () => {
        console.log("logout")
        Cache.setToCache('Auth', null);

    }

	render() {
		let profile = this.props.profile;

		return (
			<div className="topbar__profile">
				<button className="topbar__avatar" onClick={this.toggle}>
					<img className="topbar__avatar-img" src={Ava} alt="avatar" />
					<p className="topbar__avatar-name">{profile.getUsername()}</p>
					<DownIcon className="topbar__icon" />
				</button>
				{this.state.collapse && <button className="topbar__back" onClick={this.toggle} />}
				<Collapse isOpen={this.state.collapse} className="topbar__menu-wrap">
					<div className="topbar__menu">
						<TopbarMenuLink onClick={this.logout} title="Log Out" icon="exit" path="/login" />
					</div>
				</Collapse>
			</div>
		);
	}
}

function mapStateToProps(state){
    return {
        profile: state.profile
    };
}



export default connect(mapStateToProps)(TopbarProfile);
