import React from 'react';
import Fade from '@material-ui/core/Fade';
import { compose } from 'lodash/fp';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { connect } from "react-redux";
import { CardBody, Col, Container, Row } from 'reactstrap';
import DataWidget from '../DataWidget/DataWidget';
import TransactionsOpen from './components/TransactionsOpen';
import TransactionsProfile from './components/TransactionsProfile';

import DepositsTable from './components/DepositsTable'

import HorizontalTabs from '../HorizontalTabs'
import WithdrawalsTable from './components/WithdrawalsTable';


class TransactionsContainer extends React.Component{

    constructor(props){
        super(props)
    }

    allowWithdraw = async (withdraw) => {
        const { profile } = this.props;

        await profile.getApp().externalApproveWithdraw({ withdraw });
        await profile.getApp().getUsersWithdrawals({ size: 100, offset: 0 });
    }

    cancelWithdraw = async ({ withdraw }) => {
        const { profile } = this.props;

        await profile.getApp().externalCancelWithdraw({ withdraw });
        await profile.getApp().getUsersWithdrawals({ size: 100, offset: 0 });
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
        const { profile } = this.props;
        const app = profile.getApp();

        const deposits = app.params.deposits;
        const currencies = app.params.currencies;

        return (
            <Fade in timeout={{ appear: 200, enter: 200, exit: 200 }}>
            <Container className="dashboard">
                <Row>
                    <Col lg={3}>
                        <DataWidget>
                            <TransactionsProfile data={this.props.profile.getApp().getSummaryData('withdraws')}/>
                        </DataWidget>
                    </Col>
                    <Col lg={3}>
                        <DataWidget>
                            <TransactionsOpen data={this.props.profile.getApp().getSummaryData('withdraws')}/>
                        </DataWidget>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                    <CardBody className="dashboard__card-widget" style={{ borderRadius: "10px", border: "solid 1px rgba(164, 161, 161, 0.35)", backgroundColor: "#fafcff", boxShadow: "none", padding: 10 }}>
                        <HorizontalTabs
                            padding={false}
                            tabs={[
                                {
                                    label : 'Deposits',
                                    tab : <DepositsTable/>
                                },
                                {
                                    label : 'Withdrawals',
                                    tab : <WithdrawalsTable cancelWithdraw={this.cancelWithdraw} allowWithdraw={this.allowWithdraw}/>
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

