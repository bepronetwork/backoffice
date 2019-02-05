import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { compose } from 'lodash/fp'
import WalletInfo from './components/WalletInfo';
import EURWalletWidget from './components/EURWalletWidget';
import ETHWalletWidget from './components/ETHWalletWidget';
import LiquidityInfo from './components/LiquidityInfo';
import LiquidityWalletWidget from './components/LiquidityWalletWidget';


class WalletContainer extends React.Component{

    constructor(props){
        super(props)
    }


    render = () => {
        return (
            <Container className="dashboard">
                <Row>
                    <Col lg={3}>
                        <LiquidityInfo/>
                    </Col>
                </Row> 
                <Row>
                    <Col lg={5}>
                        <LiquidityWalletWidget data={this.props.profile.getApp().getSummaryData('wallet')}/>
                    </Col>
                   
                </Row>
                <Row>
                    <Col lg={3}>
                        <WalletInfo app={this.props.profile.getApp()}/>
                    </Col>
                </Row> 
                <Row>
                    <Col lg={5}>
                        <EURWalletWidget data={this.props.profile.getApp().getSummaryData('wallet')}/>
                    </Col>
                    <Col lg={5}>
                        <ETHWalletWidget data={this.props.profile.getApp().getSummaryData('wallet')}/>
                    </Col>
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

WalletContainer.propTypes = {
    t: PropTypes.func.isRequired
};


export default compose(
    translate('common'),
    connect(mapStateToProps)
)(WalletContainer);

