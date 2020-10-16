import React from 'react';
import Fade from '@material-ui/core/Fade';
import { compose } from 'lodash/fp';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { connect } from "react-redux";
import { CardBody, Col, Container, Row } from 'reactstrap';
import DataWidget from '../DataWidget/DataWidget';
import WithdrawalsOpen from './components/WithdrawalsOpen';
import WithdrawalsProfile from './components/WithdrawalsProfile';
import DepositsProfile from './components/DepositsProfile';

import DepositsTable from './components/DepositsTable'

import HorizontalTabs from '../HorizontalTabs'
import WithdrawalsTable from './components/WithdrawalsTable';

import _ from 'lodash';

class TransactionsContainer extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            withdrawals: [],
            deposits: [],
            loadingWithdrawals: false,
            loadingDeposits: false
        }
    }

    setWithdrawals = (newWithdrawals) => {
        const { withdrawals } = this.state;
        this.setState({ withdrawals: _.concat(withdrawals, newWithdrawals) })
    }

    setDeposits = (newDeposits) => {
        const { deposits } = this.state;
        this.setState({ deposits: _.concat(deposits, newDeposits) })
    }
    
    setLoadingWithdrawals = (value) => {
        this.setState({ loadingWithdrawals: value })
    }

    setLoadingDeposits = (value) => {
        this.setState({ loadingDeposits: value })
    }

    allowWithdraw = async (withdraw) => {
        const { profile } = this.props;
        const wallet = this.props.profile.getApp().getWallet({currency_id : withdraw.currency._id});
        /** Do Withdraw to User */
        await profile.getApp().approveWithdraw({...withdraw, currency : wallet.currency, bank_address : wallet.bank_address});

        /** Update Info */
        await profile.getApp().getWithdrawsAsync({});
        await profile.update();
    }

    cancelWithdraw = async ({ withdraw, reason }) => {
        const { profile } = this.props;

        /** Do Withdraw to User */
        await profile.getApp().cancelUserWithdraw({ withdraw, note: reason });

        /** Update Info */
        await profile.getApp().getWithdrawsAsync({});
        await profile.update();
    }

    confirmDeposit = async (depositObject) => {
        const { currency, profile } = this.props;

        var { transactionHash, amount } = depositObject;
        try{
            await profile.getApp().updateWallet({amount, transactionHash, currency_id : currency._id});
            await profile.getData();
            this.projectData(this.props);
        }catch(err){
            // TO DO : Raise Notification System
            throw err;
        }
      }

    render = () => {
        const { withdrawals, deposits, loadingDeposits, loadingWithdrawals } = this.state;

        return (
            <Fade in timeout={{ appear: 200, enter: 200, exit: 200 }}>
            <Container className="dashboard">
                <Row>
                    <Col lg={3}>
                        <DataWidget>
                            <DepositsProfile data={deposits} loading={loadingDeposits}/>
                        </DataWidget>
                    </Col>
                    <Col lg={3}>
                        <DataWidget>
                            <WithdrawalsProfile data={withdrawals} loading={loadingWithdrawals}/>
                        </DataWidget>
                    </Col>
                    <Col lg={3}>
                        <DataWidget>
                            <WithdrawalsOpen data={withdrawals} loading={loadingWithdrawals}/>
                        </DataWidget>
                    </Col>
                   {/* <Col lg={6}>         
                        <div className="dashboard__visitors-chart">
                            <p className="dashboard__visitors-chart-title" style={{fontSize : 20, marginLeft : 20, marginBottom : 10}}> Filters <span>  </span></p>
                        </div>  
                        <TransactionsFilterUserId data={this.props.profile.getApp().getSummaryData('transactions')}/>
                    </Col>
                    */}
                </Row>
                <Row>
                    <Col lg={12}>
                    <CardBody className="dashboard__card-widget" style={{ borderRadius: "10px", border: "solid 1px rgba(164, 161, 161, 0.35)", backgroundColor: "#fafcff", boxShadow: "none", padding: 10 }}>
                        <HorizontalTabs
                            padding={false}
                            tabs={[
                                {
                                    label : 'Deposits',
                                    tab : <DepositsTable setDeposits={this.setDeposits} setLoading={this.setLoadingDeposits}/>
                                },
                                {
                                    label : 'Withdrawals',
                                    tab : <WithdrawalsTable setWithdrawals={this.setWithdrawals} setLoading={this.setLoadingWithdrawals}/>
                                } 
                            ]}
                        />
                    </CardBody>
                    </Col>
                </Row>
          </Container>
          </Fade>
        )
    }

}



function mapStateToProps(state){
    return {
        profile: state.profile,
        currency: state.currency
    };
}

TransactionsContainer.propTypes = {
    t: PropTypes.func.isRequired
};


export default compose(
    translate('common'),
    connect(mapStateToProps)
)(TransactionsContainer);

