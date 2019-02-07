import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { compose } from 'lodash/fp'
import CurrencyInfo from './components/CurrencyInfo';
import CurrencyBox from './components/CurrencyBox';
import QRCodeContainer from './components/QRCode';


class DepositWidget extends React.Component{

    constructor(props){
        super(props)
    }


    render = () => {
        return (
            <Container className="dashboard">
                <Col lg={12}>
                    <CurrencyInfo/>
                </Col>
                <Col lg={4}>
                    <CurrencyBox  data={this.props.profile.getApp().getSummaryData('wallet')}/>
                </Col>
                <Row>
                </Row>
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

