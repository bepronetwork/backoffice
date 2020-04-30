/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import {  Col, Row } from 'reactstrap';
import { connect } from "react-redux";
import CurrencyInfo from './CurrencyInfo';
import VirtualCurrencyInfo from './VirtualCurrencyInfo';
const image = `${process.env.PUBLIC_URL}/img/dashboard/empty.png`;

class CurrenciesContainer extends PureComponent {
 
    constructor() {
        super();
        this.state = {
            currencies : []
        };
    }

    componentDidMount(){
        this.projectData(this.props);
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }

    projectData = async (props) => {
        const { profile } = props;

        const app = await profile.getApp();

        this.setState({ currencies: app.params.currencies });
    }

    isAdded = (AddOn) => {
        const app = this.props.profile.App;
        const appAddOns = app.params.addOn;

        return !!Object.keys(appAddOns).find(k => AddOn.toLowerCase().includes(k.toLowerCase()));
         
    }
    

    render() {
        const { currencies } = this.state;
        const { profile } = this.props;

        const isAppWithFakeMoney = profile.App.params.virtual;
        const hasInitialBalanceAddOn = this.isAdded('Initial Balance');
        const realCurrencies = currencies.filter(currency => currency.virtual === false);
        const virtualCurrencies = currencies.filter(currency => currency.virtual === true);

        return (

            ((realCurrencies.length > 0 && hasInitialBalanceAddOn)||virtualCurrencies.length > 0 ) ? 
                <Row md={12} xl={12} lg={12} xs={12}>
                    {virtualCurrencies.map(currency => (
                            <Col lg={4}>
                                <VirtualCurrencyInfo data={currency} {...this.props}/>
                            </Col>                
                    ))}

                    {!isAppWithFakeMoney ? (
                        realCurrencies.map(currency => (
                            <Col lg={4}>
                                <CurrencyInfo data={currency} {...this.props}/>
                            </Col>              
                    ))
                    ) : null}
                    
                </Row>
            : 
            <div>
                <h4>You have no Initial Balance Add-On enabled currently</h4>
                <img src={image} style={{width :'30%', marginTop : 20}}/>
            </div>
        );
    }
}


function mapStateToProps(state){
    return {
        profile: state.profile,
        isLoading: state.isLoading
    };
}

export default connect(mapStateToProps)(CurrenciesContainer);

