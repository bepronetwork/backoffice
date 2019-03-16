import React, { PureComponent } from 'react';
import { Button, ButtonToolbar, Container, Row, Col, CardBody, Card } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { connect } from "react-redux";
import { compose } from 'lodash/fp'
import PropTypes from 'prop-types';
import { ApplicationIcon, DesktopMacDashboardIcon, BusinessIcon, CheckboxMultipleBlankCircleIcon, MediaNetworkIcon } from 'mdi-react';
import TextInput from '../../../../shared/components/TextInput';
const Back = `${process.env.PUBLIC_URL}/img/background-login.png`;


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
            <div className={'container__all'}>
				<Row className={'container__all'}  style={{marginTop : '10%'}}>
                    <Col lg={6} className={'login_background indexed'} >
						<img className="login_background indexed" src={Back} />
					</Col>
                    <Col lg={6}>
                    <div className="account__wrapper">
							<div className="account__card">
							
                            <form className="form" onSubmit={handleSubmit}>
                        <div className="form__form-group">
                            <h3 className="wizard__title">Create your First Application</h3>
                                <TextInput
                                    icon={ApplicationIcon}
                                    name="name"
                                    label="App"
                                    type="text"
                                    placeholder="RiskYou"
                                    changeContent={this.changeContent}
                                />
                                <TextInput
                                    icon={DesktopMacDashboardIcon}
                                    name="description"
                                    label="Description"
                                    type="text"
                                    placeholder="A Great Casino Platform for Risk Users"
                                    changeContent={this.changeContent}
                                />
                                <TextInput
                                    icon={BusinessIcon}
                                    name="market"
                                    type="text"
                                    placeholder="Casino"
                                    label="Market"
                                    changeContent={this.changeContent}
                                />
                                <TextInput
                                    icon={MediaNetworkIcon}
                                    name="website"
                                    label="Website"
                                    type="text"
                                    placeholder="https://www.risk.you"
                                    changeContent={this.changeContent}
                                />
                                
                            </div>
                    
                            <div className="account__btns">
                                <button style={{maxWidth : 350, marginTop  :30}}  onClick={() => this.createApp()} c className="btn btn-primary account__btn">Create</button>
                            </div>
                          
                        </form>
                        </div>
                        </div>
		                    
                    </Col>
                </Row>
            </div>
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


