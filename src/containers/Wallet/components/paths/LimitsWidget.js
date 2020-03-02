import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { compose } from 'lodash/fp'
import _ from 'lodash';
import { ArrowExpandDownIcon } from 'mdi-react';
import LimitsBox from './limits/LimitsBox';
const deposit = `${process.env.PUBLIC_URL}/img/dashboard/deposit.png`;
const withdrawal = `${process.env.PUBLIC_URL}/img/dashboard/withdrawal.png`;

const defaultState = {
    maxDeposit : 0,
    new_maxDeposit : 0,
    maxWithdrawal : 0,
    new_maxWithdrawal : 0,
    locks : {},
    currencyTicker : 'N/A',
    locks : {
        maxWithdrawal : true,
        maxDeposit : true
    },
    isLoading : {
        maxWithdrawal : false,
        maxDeposit : false
    }
}

class LimitsWidget extends React.Component{

    constructor(props){
        super(props);
        this.state = defaultState;
    }

    componentDidMount(){
        this.projectData(this.props)
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }

    projectData = async (props) => {

        let { wallet } = props;
        let currencyTicker, maxDeposit, maxWithdrawal;

        if(wallet.currency != undefined) {

            let currencyTicker = wallet.currency.ticker;
            let maxDeposit = wallet.max_deposit;
            let maxWithdrawal = wallet.max_withdraw;

            this.setState({...this.state, 
                currencyTicker,
                maxDeposit,
                maxWithdrawal
            });
        }

        await props.profile.getApp().getSummary();
        wallet = props.profile.getApp().getSummaryData('walletSimple').data[0];
        await props.profile.update();
        console.log(wallet);
        currencyTicker = wallet.currency.ticker;
        maxDeposit = wallet.max_deposit;
        maxWithdrawal = wallet.max_withdraw;

        this.setState({...this.state, 
            currencyTicker,
            maxDeposit,
            maxWithdrawal,
            wallet
        });
        
    }

    onChange = ({type, value}) => {
        this.setState({...this.state, [`new_${type}`] : value })
    }

    unlockField = ({field}) => {
        this.setState({...this.state, locks : {...this.state.locks, [field] : false }})
    }

    lockField = ({field}) => {
        this.setState({...this.state, locks : {...this.state.locks, [field] : true }})
    }

    confirmChanges = async ({field}) => {
        var { profile, wallet } = this.props;
        this.setState({...this.state, isLoading : {...this.state.isLoading, [field] : true}})
        switch(field){
            case 'maxDeposit' : {
                await profile.getApp().changeMaxDeposit({ amount : this.state[`new_${field}`], wallet_id : wallet._id });
                break;
            };
            case 'maxWithdrawal' : {
                await profile.getApp().changeMaxWithdraw({ amount : this.state[`new_${field}`], wallet_id : wallet._id });
                break;
            };
        }
        this.projectData(this.props);
        this.state.locks[field] = true;
        // this.setState();
        
    }

    render = () => {

        return (
            <Container className="dashboard">
                <Col lg={12}>
                    <h3 style={{marginTop : 20 }} className={"bold-text dashboard__total-stat"}>Financial Limits</h3>
                    <p className="" style={{marginBottom : 50 }}>
                        Choose the limits to deposit and withdraw of your wallet.
                    </p>
                </Col>
                <Row>
                    <Col lg={5}>
                        <LimitsBox
                           title={'Max Deposit'}
                           inputIcon={ArrowExpandDownIcon}
                           currencyTicker={this.state.currencyTicker}
                           image={deposit}
                           lock={this.state.locks.maxDeposit}
                           type={'maxDeposit'} 
                           value={this.state.maxDeposit}
                           new_value={this.state.new_maxDeposit} 
                           /* Functions */
                           unlockField={this.unlockField} 
                           isLoading={this.state.isLoading.maxDeposit}
                           lockField={this.lockField}
                           onChange={this.onChange} 
                           confirmChanges={this.confirmChanges} 
                        />
                    </Col>
                    <Col lg={5}>
                        <LimitsBox
                           title={'Max Withdrawal'}
                           inputIcon={ArrowExpandDownIcon}
                           currencyTicker={this.state.currencyTicker}
                           image={withdrawal}
                           lock={this.state.locks.maxWithdrawal}
                           type={'maxWithdrawal'} 
                           value={this.state.maxWithdrawal}
                           isLoading={this.state.isLoading.maxWithdrawal}
                           new_value={this.state.new_maxWithdrawal} 
                           /* Functions */
                           unlockField={this.unlockField} 
                           lockField={this.lockField} 
                           onChange={this.onChange} 
                           confirmChanges={this.confirmChanges} 
                        />
                    </Col>
                </Row>
            </Container>
        )
    }

}

function mapStateToProps(state){
    return {
        profile: state.profile,
        wallet: (state.wallet.currency) ? state.wallet : state.profile.getApp().getSummaryData('walletSimple').data[0]
    };
}

LimitsWidget.propTypes = {
    t: PropTypes.func.isRequired
};


export default compose(
    translate('common'),
    connect(mapStateToProps)
)(LimitsWidget);