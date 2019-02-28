import React, { PureComponent } from 'react';
import { Button, ButtonToolbar } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { connect } from "react-redux";
import { compose } from 'lodash/fp'
import PropTypes from 'prop-types';
import { ApplicationIcon, DesktopMacDashboardIcon, BusinessIcon, DownloadNetworkIcon, MediaNetworkIcon } from 'mdi-react';

class WizardFormOne extends PureComponent {

	constructor() {
		super();
		this.state = {
		    showPassword: false,
		};
	}

	changeContent = (type, item) => {
		this.setState({[type] : item});
	}

	showPassword = (e) => {
		e.preventDefault();
		this.setState({
		    showPassword: !this.state.showPassword,
		});
    };
    
    createApp = async () => {
        try{
            
            await this.props.profile.createApp({
                ...this.state,
                name : this.state.name,
                description :  this.state.description,
                // TO DO : Create Metadata JSON Add on Inputs (Logo and Other Data)
                metadataJSON :  JSON.stringify({}),
                // TO DO : Create MarketType Setup 
                marketType : 0
            });
            this.props.history.push('/home')
        }catch(err){
            this.props.showNotification(err.message);
        }
    }

	render() {
		const { handleSubmit } = this.props;

		return (
		<form className="form form--horizontal wizard__form" onSubmit={handleSubmit}>
			<h3 className="wizard__title">Create your First Application</h3>
			<div className="form__form-group">
				<span className="form__form-group-label">Name</span>
				<div className="form__form-group-field">
					<div className="form__form-group-icon">
					<ApplicationIcon />
					</div>
					<Field
					name="name"
					component="input"
					type="text"
					placeholder="RiskYou"
					onChange={(e) =>  this.changeContent('name', e.target.value)}/>
				</div>
			</div>
			<div className="form__form-group">
				<span className="form__form-group-label">Description</span>
				<div className="form__form-group-field">
					<div className="form__form-group-icon">
					<DesktopMacDashboardIcon />
					</div>
					<Field
					name="description"
					component="input"
					type="text"
					placeholder="A Great Casino Platform for Risk Users"
					onChange={(e) =>  this.changeContent('description', e.target.value)}/>
				</div>
			</div>

            <div className="form__form-group">
				<span className="form__form-group-label">Market</span>
				<div className="form__form-group-field">
					<div className="form__form-group-icon">
					<BusinessIcon />
					</div>
					<Field
					name="market"
					component="input"
					type="text"
					placeholder="Casino"
					onChange={(e) =>  this.changeContent('market', e.target.value)}/>
				</div>
			</div>

            <div className="form__form-group">
				<span className="form__form-group-label">Website</span>
				<div className="form__form-group-field">
					<div className="form__form-group-icon">
					<MediaNetworkIcon />
					</div>
					<Field
					name="website"
					component="input"
					type="text"
					placeholder="https://www.risk.you"
					onChange={(e) =>  this.changeContent('website', e.target.value)}/>
				</div>
			</div>
			
			<ButtonToolbar className="form__button-toolbar wizard__toolbar">
			    <Button onClick={() => this.createApp()} color="primary" type="submit" className="next"> Enter the B-PRO Ecosystem</Button>
			</ButtonToolbar>
		</form>
		);
	}
}

function mapStateToProps(state){
    return {
        profile: state.profile
    };
}



export default compose(reduxForm({
	form: 'wizard', //                 <------ same form name
}),  connect(mapStateToProps))(WizardFormOne);


