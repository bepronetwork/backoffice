import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { compose } from 'lodash/fp'
import _ from 'lodash';
import { ArrowExpandDownIcon, WalletProductIcon } from 'mdi-react';
import LimitsBox from './limits/LimitsBox';
import { TabContainer } from '../WalletTabs/styles';
import { Paragraph } from '../LiquidityWalletContainer/styles';
const deposit = `${process.env.PUBLIC_URL}/img/dashboard/deposit.png`;
const withdrawal = `${process.env.PUBLIC_URL}/img/dashboard/withdrawal.png`;

const defaultState = {
    maxDeposit : 0,
    new_maxDeposit : 0,
    maxWithdrawal : 0,
    new_maxWithdrawal : 0,
    minWithdrawal: 0,
    new_minWithdrawal: 0,
    affiliateMinWithdrawal: 0,
    new_affiliateMinWithdrawal: 0,
    currencyTicker : 'N/A',
    locks : {
        maxWithdrawal: true,
        maxDeposit: true,
        minWithdrawal: true,
        affiliateMinWithdrawal: true
    },
    isLoading : {
        maxWithdrawal: false,
        maxDeposit: false,
        minWithdrawal: false,
        affiliateMinWithdrawal: false
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
        // this.projectData(props);
    }

    projectData = async (props) => {
        let { wallet } = props.data;

        let currencyTicker, maxDeposit, maxWithdrawal, minWithdrawal, affiliateMinWithdrawal;
        currencyTicker = wallet.currency.ticker;
        wallet = props.profile.getApp().getSummaryData('walletSimple').data.find(c => {return c.currency.ticker === currencyTicker });
        
        currencyTicker = wallet.currency.ticker;
        maxDeposit = wallet.max_deposit;
        maxWithdrawal = wallet.max_withdraw;
        minWithdrawal = wallet.min_withdraw;
        affiliateMinWithdrawal = wallet.affiliate_min_withdraw;

        this.setState({...this.state,
            currencyTicker,
            maxDeposit,
            maxWithdrawal,
            minWithdrawal,
            affiliateMinWithdrawal,
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
        const { profile } = this.props;
        const { wallet } = this.state;

        this.setState({
            ...this.state,
            isLoading : {
                ...this.state.isLoading,
                [field] : true
            }
        });
        // eslint-disable-next-line default-case
        switch (field){
            // eslint-disable-next-line no-lone-blocks
            case 'maxDeposit' : {
                // this.setState({...this.state,
                //     maxDeposit: this.state.new_maxDeposit
                // });
                await profile.getApp().changeMaxDeposit({ amount : this.state[`new_${field}`], wallet_id : wallet._id });
                this.state.locks[field] = true;
                this.setState({...this.state, isLoading : {...this.state.isLoading, [field] : false}, maxDeposit: this.state.new_maxDeposit});
                break;
            }
            // eslint-disable-next-line no-lone-blocks
            case 'maxWithdrawal' : {
                // this.setState({...this.state,
                //     maxWithdrawal: this.state.new_maxWithdrawal
                // });
                await profile.getApp().changeMaxWithdraw({ amount : this.state[`new_${field}`], wallet_id : wallet._id });
                this.state.locks[field] = true;
                this.setState({...this.state, isLoading : {...this.state.isLoading, [field] : false}, maxWithdrawal: this.state.new_maxWithdrawal});
                break;
            }

            case 'minWithdrawal' : {

                await profile.getApp().changeMinWithdraw({ amount: this.state[`new_${field}`], wallet_id: wallet._id });
                this.state.locks[field] = true;
                this.setState({...this.state, isLoading : {...this.state.isLoading, [field] : false}, minWithdrawal: this.state.new_minWithdrawal});

                break;
            }

            case 'affiliateMinWithdrawal' : {

                await profile.getApp().changeAffiliateMinWithdraw({ amount: this.state[`new_${field}`], wallet_id: wallet._id });
                this.state.locks[field] = true;
                this.setState({...this.state, isLoading : {...this.state.isLoading, [field] : false}, affiliateMinWithdrawal: this.state.new_affiliateMinWithdrawal});

                break;
            }
        }
        // this.projectData(this.props);
        // this.setState();
    }

    render = () => {

        return (
            <>
            <TabContainer>
                <Paragraph style={{ marginBottom: 15 }}>Choose the limits to deposit and withdraw of your wallet</Paragraph>
            <Row>
                <Col xl="6" lg="6" md="12" sm="12" xs="12">
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
                <Col xl="6" lg="6" md="12" sm="12" xs="12">
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
                <Col xl="6" lg="6" md="12" sm="12" xs="12">
                    <LimitsBox
                        title={'Min Withdrawal'}
                        inputIcon={ArrowExpandDownIcon}
                        currencyTicker={this.state.currencyTicker}
                        image={withdrawal}
                        lock={this.state.locks.minWithdrawal}
                        type={'minWithdrawal'} 
                        value={this.state.minWithdrawal}
                        isLoading={this.state.isLoading.minWithdrawal}
                        new_value={this.state.new_minWithdrawal} 
                        unlockField={this.unlockField} 
                        lockField={this.lockField} 
                        onChange={this.onChange} 
                        confirmChanges={this.confirmChanges} 
                    />
                </Col>
                <Col xl="6" lg="6" md="12" sm="12" xs="12" >
                    <LimitsBox
                        title={'Affiliate Min Withdrawal'}
                        inputIcon={ArrowExpandDownIcon}
                        currencyTicker={this.state.currencyTicker}
                        image={withdrawal}
                        lock={this.state.locks.affiliateMinWithdrawal}
                        type={'affiliateMinWithdrawal'} 
                        value={this.state.affiliateMinWithdrawal}
                        isLoading={this.state.isLoading.affiliateMinWithdrawal}
                        new_value={this.state.new_affiliateMinWithdrawal} 
                        unlockField={this.unlockField} 
                        lockField={this.lockField} 
                        onChange={this.onChange} 
                        confirmChanges={this.confirmChanges} 
                    />
                </Col>
            </Row>
            </TabContainer>
        </>
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