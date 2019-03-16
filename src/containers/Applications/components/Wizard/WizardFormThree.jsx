import React from 'react';
import { Button, ButtonToolbar, Container, Row, Col, CardBody, Card } from 'reactstrap';

import { Field, reduxForm } from 'redux-form';
import { connect } from "react-redux";
import { compose } from 'lodash/fp'
import store from '../../../App/store';
import { setWidgetData } from '../../../../redux/actions/widgets';
const bitcoin = `${process.env.PUBLIC_URL}/img/bitcoin.png`;
const back_2 = `${process.env.PUBLIC_URL}/img/landing/back-2.png`;
const casino = `${process.env.PUBLIC_URL}/img/casino.png`;

class WizardFormThree extends React.Component{
    constructor(props){super(props)}

    setWidget = (key) => {
        store.dispatch(setWidgetData(key));
    }
    
    casino = () => {
        return (
            <Col md={3}>
                <Card>
                    <div className='landing__product__widget__small'>
                        <div className='description'>
                            <h4> Casino </h4>
                            <p> A Casino Application from Layout, Engines & Games </p>
                        </div>
                        <h2 style={{marginTop : 30}}> 0,5% <h5>Per Transaction</h5></h2>
                        <img className='image_widget' src={casino}></img>
                    </div>
                </Card>
            </Col>        
        )
    }

    crypto = () => {
        return (
            <Col md={3}>
                <Card>
                 <div> <h5 className={`widget__use`}> Widget </h5></div> 

                    <div className='landing__product__widget__small'>
                        <div className='description'>
                            <h4> CryptoCurrency</h4>
                            <p> Accept Multiple CryptoCurrencies for your Platform </p>
                        </div>
                        <h2 style={{marginTop : 30}}> 0,5% <h5>Per Transaction</h5></h2>
                        <img className='image_widget' src={bitcoin}></img>
                    </div>
                </Card>
            </Col>       
            )
    }

    render = () => {
        let {
            casino,
            crypto
        } = this.props.widgets;

        return(
            <div style={{width : '80%'}}>
                <div className="dashboard__visitors-chart" >
                    <h3 className="dashboard__visitors-chart-title" style={{marginTop : 30, textAlign : 'center'}}> Complete </h3>
                </div>
				<Row>      
                    {casino ? this.casino() : null}               
                    {crypto ? this.crypto() : null}               
                </Row>
                <ButtonToolbar style={{margin : 'auto'}} className="form__button-toolbar wizard__toolbar">
                    <Button style={{margin : 'auto'}} color="secondary" type="button" className="previous" onClick={ () => this.props.previousPage()}>Back</Button>
                    <Button style={{margin : 'auto'}} color="primary" type="submit" className="next"  onClick={ () => this.props.sendServices()}>Submit </Button>
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
}),  connect(mapStateToProps))(WizardFormThree);
