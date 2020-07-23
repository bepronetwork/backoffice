import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Row, Col, Container, Card, CardBody } from 'reactstrap';
import Skeleton from '@material-ui/lab/Skeleton';
import AnimationNumber from '../../UI/Typography/components/AnimationNumber';
import _ from 'lodash';
import Numbers from '../../../services/numbers';
import HorizontalTabs from '../../HorizontalTabs';
import UserTransactionsTable from './components/UserTransactionsTable';
import AffiliateInfo from './components/AffiliateInfo';
import { compareIDS } from '../../../lib/string';
import UserBetsTable from './components/UserBetsTable';
import TopUpBalance from './components/TopUpBalance';
import { ProgressBar } from 'react-bootstrap';

const defaultProps = {
    ticker : 'No Currency Chosen'
}

class UserPage extends React.Component{

    constructor(props){
        super(props);
        this.state = {};
    }

    componentDidMount(){
        this.projectData(this.props)
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }

    projectData = async (props) => {
        const { profile, currency, location } = props;

        const userId = location.state.userId;

        const currencyTicker = currency.ticker ? currency.ticker : defaultProps.ticker;
        const user = await profile.getApp().getUserAsync({ user: userId, currency: currency });

        this.setState({...this.state, 
            currencyTicker,
            user: user
        })
    }

    getUserInfo = async (currency) => {
        const users = await this.props.profile.getApp().getSummaryData('usersInfoSummary');
        const otherInfo = await this.props.profile.getApp().getSummaryData('users');
        const user = users.data.filter(u => u._id === this.props.location.state.userId);
        const info = otherInfo.data.filter(i => i._id === user[0]._id);
        
        return {...info[0], ...user[0]};
    }

    allowWithdraw = async (withdraw) => {
        const { profile } = this.props;
        const wallet = this.props.profile.getApp().getWallet({currency_id : withdraw.currency._id});
        // console.log(wallet);
        /** Do Withdraw to User */
        await profile.getApp().approveWithdraw({...withdraw, currency : wallet.currency, bank_address : wallet.bank_address});

        /** Update Info */
        await profile.getApp().getWithdrawsAsync({});
        await profile.update();

    }

    renderDataTitle = ({title, data, span, loading, decimals}) => {

        return (
            <Card>
                <CardBody className="dashboard__card-widget" style={{ borderRadius: "10px", border: "solid 1px rgba(164, 161, 161, 0.35)", backgroundColor: "#fafcff", boxShadow: "none" }}>
                    <p className='text-small pink-text'> {title} </p>
                    {loading ? (
                        <Skeleton variant="rect" height={12} style={{ marginTop: 10, marginBottom: 10 }}/>
                    ) : (
                        <h4 className='secondary-text' style={{marginTop : 5}}> <AnimationNumber decimals={decimals} font={'11pt'} number={data}/> <span className='text-x-small'>{span}</span></h4>
                    )}
                </CardBody>
            </Card>
        )
    }

    renderBonusAmount = ({title, bonusAmount, incrementBetAmountForBonus, minBetAmountForBonusUnlocked, span, loading, decimals}) => {

        const percenteToBonus = 100 * (incrementBetAmountForBonus / minBetAmountForBonusUnlocked);

        return (
            <Card style={{ minWidth: minBetAmountForBonusUnlocked > 0 ? 230 : 0 }}>
                <CardBody className="dashboard__card-widget" style={{ borderRadius: "10px", border: "solid 1px rgba(164, 161, 161, 0.35)", backgroundColor: "#fafcff", boxShadow: "none" }}>
                    <p className='text-small pink-text'> {title} </p>
                    {loading ? (
                        minBetAmountForBonusUnlocked > 0 ? (
                            <>
                                <Skeleton variant="rect" height={12} style={{ marginTop: 10, marginBottom: 10 }}/>
                                <hr/>
                                <Skeleton variant="rect" height={12} style={{ marginTop: 10, marginBottom: 10 }}/>
                                <Skeleton variant="rect" height={20} style={{ marginTop: 10, marginBottom: 10 }}/>
                                <Skeleton variant="rect" height={12} style={{ marginTop: 10, marginBottom: 10 }}/>
                            </>
                        ) : (
                            <Skeleton variant="rect" height={12} style={{ marginTop: 10, marginBottom: 10 }}/>
                        )
                    ) : (
                        <>
                        <h4 className='secondary-text' style={{marginTop : 5}}> <AnimationNumber decimals={6} font={'11pt'} number={bonusAmount}/> <span className='text-x-small'>{span}</span></h4>
                        { minBetAmountForBonusUnlocked > 0 ? (
                            <>
                            <hr/>
                            <p className='text-small' style={{ fontSize: 8, margin: "0px 3px" }}>
                                Progress to withdraw the full balance
                            </p>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px 0px" }}>
                                <p className='text-small pink-text' style={{ fontSize: 10, margin: "0px 3px" }}>
                                    {`Progress (${percenteToBonus.toFixed(2)}%)`}
                                </p>
                            </div>

                            <ProgressBar striped variant="success" now={percenteToBonus}/>
                                                    
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px 0px" }}>
                                <h4 className='secondary-text'> 
                                    <AnimationNumber decimals={decimals} font={'8pt'} number={incrementBetAmountForBonus}/> <span className='text-x-small'>{span}</span>
                                </h4>
                                <h4 className='secondary-text'> 
                                    <AnimationNumber decimals={decimals} font={'8pt'} number={minBetAmountForBonusUnlocked}/> <span className='text-x-small'>{span}</span>
                                </h4>
                            </div>
                            </>
                        ) : null }
                        </>
                    )}
                </CardBody>
            </Card>
        )
    }

    renderBalanceData = ({title, data, span, loading, decimals}) => {
        const { user } = this.state;

        return (
            <Card>
                <CardBody className="dashboard__card-widget" style={{ borderRadius: "10px", border: "solid 1px rgba(164, 161, 161, 0.35)", backgroundColor: "#fafcff", boxShadow: "none", paddingBottom: 10, paddingRight: 10 }}>
                    <p className='text-small pink-text'> {title} </p>
                    {loading ? (
                        <Skeleton variant="rect" height={12} style={{ marginTop: 10, marginBottom: 10 }}/>
                    ) : (
                        <>
                        <h4 className='secondary-text' style={{marginTop : 5}}> <AnimationNumber decimals={decimals} font={'11pt'} number={data}/> <span className='text-x-small'>{span}</span></h4>
                        <hr style={{ margin: "5px 0px" }}/>
                        <TopUpBalance user={user}/>
                        </>
                    )}
                </CardBody>
            </Card>
        )
    }

    render = () => {
        const { user, currencyTicker } = this.state;
        if(!user || _.isEmpty(user)){return null};

        const { currency, isLoading } = this.props;
        const { username, email, _id, winAmount, withdraws, deposits, affiliate, profit, address, betAmount } = user;

        const wallet = user.wallet.find(wallet => wallet.currency._id === currency._id);

        const playBalance = wallet.playBalance;

        const transactions = withdraws.map( w => {return {...w, isWithdraw : true}}).concat(deposits);
        const bets = this.props.user.bets;
        const affiliateWallet = affiliate.wallet.filter(w => w.currency._id === currency._id);

        return (
            <Container className="dashboard">
                <Row>
                    <Col md={4}>
                        <div className='user-page-top'>
                            <Card>
                                <CardBody className="dashboard__card-widget" style={{ borderRadius: "10px", border: "solid 1px rgba(164, 161, 161, 0.35)", backgroundColor: "#fafcff", boxShadow: "none" }}>
                                    <Row>
                                        <Col sd={12} md={12} lg={4}>
                                            {/* Avatar */}
                                            <div>
                                                <img src={`https://avatars.dicebear.com/v2/avataaars/${_id}.svg`} className='user-avatar'/>
                                            </div>
                                        </Col>
                                        <Col sd={12} md={12} lg={8}>
                                            {/* UserInfo */}
                                            <h5 className='pink-text'> @{username}</h5>
                                            <hr></hr>
                                            <p className='secondary-text text-small'> {email}</p>
                                            <p className='text-small'> {address} </p>
                                            <p className='text-x-small'> #{_id} </p>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </div>
                    </Col>
                    <Col md={8}>
                        <Row>
                            <Col sd={12} md={4} lg={3}>
                                {this.renderBalanceData({title : 'Balance', data : playBalance ? parseFloat(playBalance).toFixed(6) : 0, span : currencyTicker, loading: isLoading, decimals: 6})}
                            </Col>
                            <Col sd={12} md={4} lg={3}>
                                {this.renderDataTitle({title : 'TurnOver', data :  betAmount ? parseFloat(betAmount).toFixed(6) : 0, span : currencyTicker, loading: isLoading, decimals: 6})}
                            </Col>
                            <Col sd={12} md={4} lg={3}>
                                {this.renderDataTitle({title : 'Win Amount', data :  winAmount ? parseFloat(winAmount).toFixed(6) : 0, span : currencyTicker, loading: isLoading, decimals: 6})}
                            </Col>
                            <Col sd={12} md={4} lg={3}>
                                {this.renderDataTitle({title : 'Profit', data :  profit ? parseFloat(profit).toFixed(6) : 0, span : currencyTicker, loading: isLoading, decimals: 6})}
                            </Col>
                            <Col sd={12} md={4} lg={3}>
                                {this.renderDataTitle({title : 'Withdraws', data :  parseFloat(withdraws.length), decimals: 0})}
                            </Col>
                            <Col sd={12} md={4} lg={3}>
                                {this.renderDataTitle({title : 'Deposits', data :  parseFloat(deposits.length), decimals: 0})}
                            </Col>
                            <Col sd={12} md={4} lg={3}>
                                {this.renderDataTitle({title : 'Affiliate Wallet', data :  !_.isEmpty(affiliateWallet) ? parseFloat(affiliateWallet[0].playBalance).toFixed(6) : 0, span : currencyTicker, loading: isLoading, decimals: 6})}
                            </Col>
                            <Col sd={12} md={4} lg={3}>
                                {this.renderDataTitle({title : 'Affiliates', data : affiliate.affiliatedLinks.length, loading: isLoading, decimals: 0})}
                            </Col>
                            <Col sd={12} md={4} lg={3}>
                                {this.renderBonusAmount({ title : 'Bonus', bonusAmount: wallet.bonusAmount, incrementBetAmountForBonus: wallet.incrementBetAmountForBonus, minBetAmountForBonusUnlocked: wallet.minBetAmountForBonusUnlocked, loading: isLoading, span: currencyTicker, decimals: 6 })}
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Card>
                    <CardBody className="dashboard__card-widget" style={{ borderRadius: "10px", border: "solid 1px rgba(164, 161, 161, 0.35)", backgroundColor: "#fafcff", boxShadow: "none" }}>
                        <HorizontalTabs
                            tabs={[
                                {
                                    label : 'Transactions',
                                    tab : <UserTransactionsTable
                                        allowWithdraw={this.allowWithdraw}
                                        ticker={currencyTicker}
                                        data={transactions}
                                    />
                                },
                                {
                                    label : 'Bets',
                                    tab : bets ? <UserBetsTable
                                        allowWithdraw={this.allowWithdraw}
                                        ticker={currencyTicker}
                                        user={user}
                                    /> : <h5>No bets</h5>
                                },
                                {
                                    label : 'Affiliate',
                                    tab : <AffiliateInfo user={user}/>
                                } 
                            ]}
                        />
                    </CardBody>
                </Card>
              
            </Container>
        )
    }

}



function mapStateToProps(state){
    return {
        profile: state.profile,
        user : state.userView,
        currency : state.currency,
        isLoading: state.isLoading
    };
}

UserPage.propTypes = {
    t: PropTypes.func.isRequired
};


export default connect(mapStateToProps)(UserPage);

