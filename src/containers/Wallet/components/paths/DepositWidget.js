import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { compose } from 'lodash/fp'
import CurrencyBox from './components/CurrencyBox';


class DepositWidget extends React.Component{

    constructor(props){
        super(props)
    }

    render = () => {
        return (
            <Container className="dashboard">
                <Col lg={12}>
                    <h3 style={{marginTop : 20}} className={"bold-text dashboard__total-stat"}>Deposit</h3>
                    <p className="">
                        Choose the Amount of Liquidity you want to Deposit
                    </p>
                </Col>
                <Col lg={4}>
                    <CurrencyBox data={this.props.profile.getApp().getSummaryData('wallet')}/>
                </Col>
             
            </Container>
        )
    }

}



function mapStateToProps(state){
    return {
        profile: state.profile
    };
}

DepositWidget.propTypes = {
    t: PropTypes.func.isRequired
};


export default compose(
    translate('common'),
    connect(mapStateToProps)
)(DepositWidget);

