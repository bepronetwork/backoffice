import React, { PureComponent } from 'react';
import { Row, Col, CardBody, Card } from 'reactstrap';
import { reduxForm } from 'redux-form';
import { connect } from "react-redux";
import { compose } from 'lodash/fp'
import { ApplicationIcon, DesktopMacDashboardIcon, CoinIcon, EthereumIcon } from 'mdi-react';
import TextInput from '../../../../shared/components/TextInput';
const Back = `${process.env.PUBLIC_URL}/img/dashboard/background-login.png`;
const loading = `${process.env.PUBLIC_URL}/img/loading.gif`;


class WizardFormOne extends PureComponent {

	constructor() {
		super();
		this.state = {
            showPassword: false,
            virtual : false
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

    selectMoneyType = () => {
        const { virtual } = this.state;

        this.setState({ virtual : !virtual });
    };
    
    createApp = async () => {
        try{
            this.setState({isLoading : true});
            let res = await this.props.profile.createApp({
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
            console.log(err);
            this.props.showNotification(err.message);
        }
    }

	render() {
        const { virtual } = this.state;
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
                                <div style={{width : "100%", display : "inline-flex", margin : "20px 0 0 28px"}}>
                                    <div style={{ width : 130, textAlign : "center" }}>
                                        <Card style={{paddingBottom : 10, cursor : "pointer"}} onClick={() => this.selectMoneyType('real')}>
                                            <CardBody style={{padding : 10, backgroundColor: !virtual ? "rgba(137, 71, 152, 0.1)" : "#fff", border: !virtual ? "1px solid #894798" : "1px solid #bebdbd"}}>
                                                <span style={{ display : "block", paddingBottom : 6}}><EthereumIcon color="grey"/></span>
                                                <span>
                                                    <p className="text-small">
                                                        Real Money
                                                    </p>
                                                </span>
                                            </CardBody>
                                        </Card>
                                    </div>
                                    <div style={{ width : 130, marginLeft : 30, textAlign : "center" }}>
                                        <Card style={{paddingBottom : 10, cursor : "pointer"}} onClick={() => this.selectMoneyType('fake')}>
                                            <CardBody style={{padding : 10, backgroundColor: virtual ? "rgba(137, 71, 152, 0.1)" : "#fff", border: virtual ? "1px solid #894798" : "1px solid #bebdbd"}}>
                                                <span style={{ display : "block", paddingBottom : 6}}><CoinIcon color="grey"/></span>
                                                <span>
                                                    <p className="text-small">
                                                        Fake Money
                                                    </p>
                                                </span>
                                            </CardBody>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                    
                            <div className="account__btns">
                                <button disabled={this.state.isLoading} style={{maxWidth : 350, marginTop  :30}}  onClick={() => this.createApp()} c className="btn btn-primary account__btn">
                                    {this.state.isLoading ? <img src={loading} style={{width : 20}}/> : 'Register App'}
                                </button>
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


