import React, { PureComponent } from 'react';
import { Button, ButtonToolbar, Container, Row, Col, CardBody, Card } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { connect } from "react-redux";
import { compose } from 'lodash/fp'
import PropTypes from 'prop-types';
import store from "../../../App/store";
import { setWidgetData } from '../../../../redux/actions/widgets';
const Back = `${process.env.PUBLIC_URL}/img/background-login.png`;

const back_2 = `${process.env.PUBLIC_URL}/img/landing/back-2.png`;
const bitcoin = `${process.env.PUBLIC_URL}/img/bitcoin.png`;
const sports = `${process.env.PUBLIC_URL}/img/sports.png`;
const casino = `${process.env.PUBLIC_URL}/img/casino.png`;
const prediction = `${process.env.PUBLIC_URL}/img/prediction.png`;

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

    setWidget = (key) => {
        store.dispatch(setWidgetData(key));
    }
    
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
        let {
            casino
        } = this.props.widgets;

        return (
            <div style={{width : '80%'}}>
                <div className="dashboard__visitors-chart" >
                    <h3 className="dashboard__visitors-chart-title" style={{marginTop : 30, textAlign : 'center'}}> Full Integrations </h3>
                </div>
				<Row>                            
                <Col md={12} xl={12} lg={12} xs={12}>
                    <Card>
                        <Row>  
                            <Col>
                                <button className={`button__widget`} onClick={() => this.setWidget('casino')}>
                                    {casino ? <div> <h5 className={`widget__use__big`}> Integrate </h5></div> : null}
                                    <div className={`landing__product__widget available`}>
                                        <div className='description'>
                                            <h4> Casino </h4>
                                            <p> A Casino Application from Layout, Engines, Games to Deposits </p>
                                        </div>
                                        <Row>
                                            <Col sd={6}>
                                                <h2 style={{marginTop : 30}}> $999 <h5>Monthly</h5></h2>
                                            </Col>
                                            <Col sd={1} style={{padding : 0}}>
                                                <h2 style={{marginTop : 30}}> +</h2>
                                            </Col>
                                            <Col sd={5}>
                                                <h2 style={{marginTop : 30}}> 5% <h5>In GGR</h5></h2>
                                            </Col>
                                        </Row>
                                        <img className='image_widget' src={casino}></img>
                                        <img className="landing_2_back" style={{left : '0%',  bottom : '-20%',width : '200%'}} src={back_2} />
                                    </div>
                                </button>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <ButtonToolbar style={{margin: 'auto', display : 'block'}} className="form__button-toolbar wizard__toolbar">
                    <Button onClick={() => this.props.onSubmit()} color="primary" type="submit" className="next">Next</Button>
                </ButtonToolbar>
            </Row>
            </div>
		);
	}
}

function mapStateToProps(state){
    return {
        profile : state.profile,
        widgets : state.widgets
    };
}



export default compose(reduxForm({
	form: 'wizard', //                 <------ same form name
}),  connect(mapStateToProps))(WizardFormOne);


