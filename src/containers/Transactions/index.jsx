import React from 'react';
import Fade from '@material-ui/core/Fade';
import { compose } from 'lodash/fp';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { connect } from "react-redux";
import { Col, Container, Row } from 'reactstrap';
import DataWidget from '../DataWidget/DataWidget';
import EnhancedTable from './components/EnhancedTable';
import TransactionsOpen from './components/TransactionsOpen';
import TransactionsProfile from './components/TransactionsProfile';


class TransactionsContainer extends React.Component{

    constructor(props){
        super(props)
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

    render = () => {
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
                        <DataWidget> 
                            <EnhancedTable
                                allowWithdraw={this.allowWithdraw}
                                cancelWithdraw={this.cancelWithdraw}
                                data={{
                                    withdraws : this.props.profile.getApp().getSummaryData('withdraws'),
                                    wallet : this.props.profile.getApp().getSummaryData('wallet')
                                }}
                            />
                        </DataWidget>
                    </Col>
                </Row>
          </Container>
          </Fade>
        )
    }

}



function mapStateToProps(state){
    return {
        profile: state.profile
    };
}

TransactionsContainer.propTypes = {
    t: PropTypes.func.isRequired
};


export default compose(
    translate('common'),
    connect(mapStateToProps)
)(TransactionsContainer);

