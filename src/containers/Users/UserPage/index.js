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
        const { profile, currency } = props;

        const user = await this.getUserInfo(currency);

        const currencyTicker = currency.ticker ? currency.ticker : defaultProps.ticker;
        const userInfo = await profile.getApp().getUserAsync({user : user._id});

        this.setState({...this.state, 
            currencyTicker,
            user : {
                ...user,
                ...userInfo
            }
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

    render = () => {
        const { user, currencyTicker } = this.state;
        if(!user || _.isEmpty(user)){return null};

        const { currency, isLoading } = this.props;
        const {
            username,
            email,
            _id,
            winAmount,
            withdraws,
            playBalance,
            deposits,
            affiliate,
            profit,
            address,
            betAmount,
            register_timestamp
        } = this.state.user;

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
                                {this.renderDataTitle({title : 'Gaming Wallet', data : playBalance ? parseFloat(playBalance).toFixed(6) : 0, span : currencyTicker, loading: isLoading, decimals: 6})}
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

