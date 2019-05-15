import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { compose } from 'lodash/fp'
import WithdrawBox from './components/WithdrawBox';


class WithdrawWidget extends React.Component{

    constructor(props){
        super(props)
    }

    render = () => {
        return (
            <Container className="dashboard">
                <Col lg={12}>
                    <h3 style={{marginTop : 20}} className={"bold-text dashboard__total-stat"}>Deposit</h3>
                    <p className="">
                        Choose the amount of Liquidity you want to withdraw
                    </p>
                </Col>
                <Col lg={4}>
                    <WithdrawBox data={this.props.profile.getApp().getSummaryData('wallet')}/>
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

WithdrawWidget.propTypes = {
    t: PropTypes.func.isRequired
};


export default compose(
    translate('common'),
    connect(mapStateToProps)
)(WithdrawWidget);

