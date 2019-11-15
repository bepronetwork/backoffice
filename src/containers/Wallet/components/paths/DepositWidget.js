import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { compose } from 'lodash/fp'
import CurrencyBox from './components/CurrencyBox';
import DepositsTable from './deposit/Table';
import _ from 'lodash';
import { getNonce } from '../../../../lib/number';

const defaultState = {
    ticker : 'N/A',
    deposits : []
}

class DepositWidget extends React.Component{

    constructor(props){
        super(props)
        this.state = defaultState;
    }

    componentDidMount(){
        this.projectData(this.props)
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }
    
    projectData = async (props) => {
        if(_.isEmpty(props.profile)){return null}
        let address = props.profile.getOwnerAddress();
        let deposits = props.profile.getApp().getDeposits();
        let ticker = props.profile.getApp().getSummaryData('wallet').data.blockchain.ticker;
        this.setState({...this.state, 
            deposits,
            ticker 
        })
    }

    confirmDeposit = async (depositObject) => {
        var { transactionHash, amount } = depositObject;
        try{
            await this.props.profile.getApp().updateWallet({amount, transactionHash});
            await this.props.profile.getData();
            this.projectData(this.props);
        }catch(err){
            // TO DO : Raise Notification System
            throw err;
        }
      }

    disable = () => {
        this.setState({...this.state, disabled : true});
    }

    enable = () => {
        this.setState({...this.state, disabled : false});
    }


    render = () => {

        const { deposits, ticker } = this.state; 
        return (
            <Container className="dashboard">
                <Col lg={12}>
                    <h3 style={{marginTop : 20}} className={"bold-text dashboard__total-stat"}>Deposit</h3>
                    <p className="">
                        Choose the Amount of Liquidity you want to Deposit
                    </p>
                </Col>

                <Row>
                    <Col lg={4}>
                        <CurrencyBox data={this.props.profile.getApp().getSummaryData('wallet')}/>
                    </Col>
                    <Col lg={8}>
                        <div style={{marginTop : 50}}>
                            <DepositsTable
                                disabled={this.state.disabled}
                                confirmDeposit={this.confirmDeposit} 
                                currency={ticker} data={deposits}
                            />
                        </div>
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

DepositWidget.propTypes = {
    t: PropTypes.func.isRequired
};


export default compose(
    translate('common'),
    connect(mapStateToProps)
)(DepositWidget);

