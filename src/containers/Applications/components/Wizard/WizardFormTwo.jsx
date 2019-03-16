import React from 'react';
import { Button, ButtonToolbar, Container, Row, Col, CardBody, Card } from 'reactstrap';

import { Field, reduxForm } from 'redux-form';
import { connect } from "react-redux";
import { compose } from 'lodash/fp'
import store from '../../../App/store';
import { setWidgetData } from '../../../../redux/actions/widgets';
const bitcoin = `${process.env.PUBLIC_URL}/img/bitcoin.png`;
const back_2 = `${process.env.PUBLIC_URL}/img/landing/back-2.png`;

class WizardFormTwo extends React.Component{
    constructor(props){super(props)}

    setWidget = (key) => {
        store.dispatch(setWidgetData(key));
    }
    

    render = () => {
        let {
            crypto
        } = this.props.widgets;

        return(
            <div style={{width : '80%'}}>
                <div className="dashboard__visitors-chart" >
                    <h3 className="dashboard__visitors-chart-title" style={{marginTop : 30, textAlign : 'center'}}> Full Integrations </h3>
                </div>
				<Row>                            
                    <Col md={12} xl={12} lg={12} xs={12}>
                        <Card>
                            <Row>  
                                <Col>
                                    <button className='button__widget' onClick={() => this.setWidget('crypto')}>
                                        {crypto ? <div> <h5 className={`widget__use__big`}> Widget </h5></div> : null}

                                        <div className='landing__product__widget available'>
                                            <div className='description'>
                                                <h4> CryptoCurrency </h4>
                                                <p> Accept Multiple CryptoCurrencies for your Platform </p>
                                            </div>
                                            <h2 style={{marginTop : 30}}> 0,5% <h5>Per Transaction</h5></h2>
                                            <img className='image_widget' src={bitcoin}></img>
                                            <img className="landing_2_back" style={{left : '0%',  bottom : '-20%',width : '200%'}} src={back_2} />
                                        </div>
                                    </button>
                                </Col>
                            </Row>
                        </Card>
                    </Col>                
                </Row>
                <ButtonToolbar style={{margin : 'auto'}} className="form__button-toolbar wizard__toolbar">
                    <Button style={{margin : 'auto'}} color="primary" type="button" className="previous" onClick={ () => this.props.previousPage()}>Back</Button>
                    <Button style={{margin : 'auto'}} color="primary" type="submit" className="next"  onClick={ () => this.props.onSubmit()}>Next</Button>
                </ButtonToolbar>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        profile: state.profile,
        widgets: state.widgets
    };
}


export default compose(reduxForm({
	form: 'wizard', //                 <------ same form name
}),  connect(mapStateToProps))(WizardFormTwo);
