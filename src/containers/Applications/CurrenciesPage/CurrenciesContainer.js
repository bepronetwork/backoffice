/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import {  Col, Row } from 'reactstrap';
import { connect } from "react-redux";
import CurrencyInfo from './CurrencyInfo';
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

    isAdded = async (AddOn) => {
        const app = await this.props.profile.getApp();
        const appAddOns = app.params.addOn;

        return !!Object.keys(appAddOns).find(k => AddOn.toLowerCase().includes(k.toLowerCase()));
         
    }

    render() {
        const { currencies } = this.state;
        const hasInitialBalanceAddOn = this.isAdded('Initial Balance');

        return (
            (currencies.length > 0 && hasInitialBalanceAddOn) ? 
                <Row md={12} xl={12} lg={12} xs={12}>
                    {currencies.map(currency => {
                        return (
                            <Col lg={4}>
                                <CurrencyInfo data={currency} {...this.props}/>
                            </Col>

                        )                  
                    })}
                </Row>
            : 
            <div>
                <h4>You have no Initial Balance AddOn and/or Currencies enabled currently</h4>
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

