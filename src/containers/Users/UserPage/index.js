import React from 'react';
import Fade from '@material-ui/core/Fade';
import Skeleton from '@material-ui/lab/Skeleton';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import HorizontalTabs from '../../HorizontalTabs';
import AnimationNumber from '../../UI/Typography/components/AnimationNumber';
import AffiliateInfo from './components/AffiliateInfo';
import TopUpBalance from './components/TopUpBalance';
import UserBetsTable from './components/UserBetsTable';
import UserTransactionsTable from './components/UserTransactionsTable';
import UserPageSkeleton from './components/UserPageSkeleton';
import { Button, ButtonBase, Popover } from '@material-ui/core';
import { ArrowUpIcon, SearchIcon, SwapHorizontalIcon } from 'mdi-react';

import BetsTable from './components/BetsTable'
import EsportsBetsTable from './components/EsportsBetsTable'

import { ConvertContainer, EsportsNotEnable } from './styles'

const esports = `${process.env.PUBLIC_URL}/img/landing/sports_small.png`;

const defaultProps = {
    ticker : 'No Currency Chosen'
}

const kycButtonStyle = {
    textTransform: "none", 
    backgroundColor: "#894798", 
    color: "#ffffff", 
    boxShadow: "none", 
    height: 25,
    margin: "10px 0px"
}

const ButtonStyle = {
    textTransform: "none", 
    backgroundColor: "#894798", 
    color: "#ffffff", 
    boxShadow: "none", 
    height: 25
}

const AbsoluteButtonStyle = {
    textTransform: "none", 
    border: "2px solid #894798", 
    color: "#894798", 
    backgroundColor: "#8947981a",
    boxShadow: "none", 
    height: 35,
    width: 95,
    margin: "0px 10px"
}

const RatioButtonStyle = {
    textTransform: "none", 
    border: "2px solid #894798", 
    color: "#894798", 
    backgroundColor: "#8947981a",
    boxShadow: "none", 
    height: 35,
    width: 95,
    margin: "0px 10px"
}

class UserPage extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loading: false,
            loadingConversion: false,
            anchorEl: null,
            selectingAbsolute: false,
            selectingRatio: false
        };
    }

    componentDidMount(){
        this.projectData(this.props)
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }

    projectData = async (props) => {
        const { profile, currency, location } = props;

        const app = await profile.getApp();
        const userId = location.state.userId;

        const currencyTicker = currency.ticker ? currency.ticker : defaultProps.ticker;
        const user = await profile.getApp().getUserAsync({ user: userId, currency: currency });

        const { kyc } = app.params.integrations;

        this.setState({...this.state, 
            currencyTicker,
            user: user,
            ecosystemAddOns: app.params.storeAddOn,
            appAddOns: app.params.addOn,
            kycActive: kyc ? kyc.isActive : false
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

    setOpen = event => {
        this.setState({ anchorEl: event.currentTarget })
    }

    setClose = () => {
        this.setState({ anchorEl: null, selectingAbsolute: false, selectingRatio: false })
    }

    
    handleConvertPoints = async ({ isAbsolut }) => {
        const { profile, currency } = this.props;
        const { user } = this.state;

        this.setState({ loadingConversion: true });

        if (currency) {
            await profile.getApp().convertPoints({ currency: currency._id, isAbsolut: isAbsolut, user: user._id });

            await profile.getApp().updateAppInfoAsync();
            await profile.update();
        }

        this.setState({ loadingConversion: false, locked: true, anchorEl: null });

        this.setClose()
    }

    
    renderPointsData = ({ addon, points, loading }) => {
        if ( _.isEmpty(addon)) return null;

        const { profile, currency } = this.props;
        const { name, ratio, isValid } = addon;

        const { anchorEl, loadingConversion, selectingAbsolute, selectingRatio } = this.state;

        const open = Boolean(anchorEl);
        const wallet = profile.App.params.wallet;
        const walletSelected = wallet.find(c => c.currency._id === currency._id);

        const ticker = walletSelected.currency.ticker;

        const selectedRatio = ratio.find(r => r.currency === currency._id);

        return (
            <Card>
                <CardBody className="dashboard__card-widget" style={{ borderRadius: "10px", border: "solid 1px rgba(164, 161, 161, 0.35)", backgroundColor: "#fafcff", boxShadow: "none", paddingRight: 10 }}>
                    <p className='text-small pink-text'> Points </p>
                    {loading ? (
                        <Skeleton variant="rect" height={12} style={{ marginTop: 10, marginBottom: 10 }}/>
                    ) : (
                        <h4 className='secondary-text' style={{marginTop : 5}}> <AnimationNumber decimals={0} font={'11pt'} number={points}/> <span className='text-x-small'>{ name }</span></h4>
                    )}

                    { isValid && (
                        <>
                        <hr/>
                        <div style={{ display: "flex", justifyContent: "flex-start" }}>
                            <Button onClick={event => this.setOpen(event)} variant="outlined" size="small" style={ButtonStyle} disabled={loadingConversion}>
                                <SwapHorizontalIcon style={{marginRight: 3}}/> Convert points
                            </Button>
                            <Popover
                                id={"convert"}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={this.setClose}
                                anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                                }}
                                transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',   
                                }}
                            >
                                <ConvertContainer>
                                    <h4 style={{ margin: 0, fontSize: 16 }}>Ratio</h4>
                                    <hr/>
                                    <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                                        <Button onClick={() => this.setState({ selectingAbsolute: true, selectingRatio: false })} variant="outlined" size="small" style={AbsoluteButtonStyle} disabled={loadingConversion || selectingAbsolute}>
                                            Absolute
                                        </Button>
                                        <h4 style={{ margin: 0, fontSize: 14 }}>{`1 point = 1.00 ${ticker}`}</h4>
                                    </div>
                                        { selectingAbsolute && <ButtonBase style={{ margin: "20px 10px"}} onClick={() => this.handleConvertPoints({ isAbsolut: true })}>
                                            <a style={{ fontSize: 14, color: "#894798" }}>{ loadingConversion && selectingAbsolute ? "Converting..." : `Yes, substitue all points for ${ticker}` }</a>
                                        </ButtonBase> }
                                    
                                    <br/>
                                    <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                                        <Button onClick={() => this.setState({ selectingAbsolute: false, selectingRatio: true })} variant="outlined" size="small" style={RatioButtonStyle} disabled={loadingConversion || selectingRatio}>
                                            Ratio based
                                        </Button>
                                        <h4 style={{ margin: 0, fontSize: 14 }}>{`1 point = ${(1 / parseFloat(selectedRatio.value)).toFixed(2)} ${ticker}`}</h4>
                                    </div>
                                        { selectingRatio && <ButtonBase style={{ margin: "20px 10px"}} onClick={() => this.handleConvertPoints({ isAbsolut: false })}>
                                            <a style={{ fontSize: 14, color: "#894798" }}>{ loadingConversion && selectingRatio ? "Converting..." : `Yes, substitue all points for ${ticker}` }</a>
                                        </ButtonBase> }
                                </ConvertContainer>
                            </Popover>
                        </div>
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

    hasAddOn = (addOn) => {
        const { appAddOns } = this.state;

        if(!_.isEmpty(appAddOns)) {
            const isAdded = _.has(appAddOns, addOn);
            const isNotEmpty = !_.isEmpty(appAddOns[addOn]);

            return isAdded && isNotEmpty;

        } else {
            return false;
        }
    }

    getAddOnObj = (addOn) => {
        const { ecosystemAddOns, appAddOns } = this.state;

        const addOnInfo = ecosystemAddOns.find(addon => addon.name.toLowerCase().includes(addOn.toLowerCase()));
        const addOnData = appAddOns[Object.keys(appAddOns).find(k => k.toLowerCase() === addOn.toLowerCase())];

        const addOnObj = _.merge({}, addOnInfo, addOnData);

        return addOnObj;
    }

    askForUserKYC = async () => {
        const { profile } = this.props;
        const { App } = profile;
        const { user } = this.state;

        if (user) {
            this.setState({ loading: true })

            await App.editUserKYC({ user: user._id, kyc_needed: true });
            await this.projectData(this.props);

            this.setState({ loading: false })
        }
    }

    render = () => {
        const { user, currencyTicker, loading, kycActive } = this.state;
        
        if (!user || _.isEmpty(user)) { return <UserPageSkeleton/> };

        const { currency, isLoading, profile } = this.props;
        const { username, email, _id, winAmount, withdraws, deposits, affiliate, profit, address, betAmount, points, kyc_status, kyc_needed } = user;
        
        const wallet = user.wallet.find(wallet => wallet.currency._id === currency._id);

        const playBalance = wallet.playBalance;

        const transactions = withdraws.map( w => {return {...w, isWithdraw : true}}).concat(deposits);
        const bets = this.props.user.bets;
        const affiliateWallet = affiliate.wallet.filter(w => w.currency._id === currency._id);

        const app = profile.getApp();
        const hasEsports = app.hasEsportsPermission();

        return (
            <Fade in timeout={{ appear: 200, enter: 200, exit: 200 }}>
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
                                            <h5 className='pink-text' style={{ marginTop: 10 }}> @{username}</h5>
                                            <hr/>
                                            <p className='secondary-text text-small'> {email}</p>
                                            <p className='text-small'> {address} </p>
                                            <p className='text-x-small'> #{_id} </p>

                                            { kyc_status !== undefined && kyc_needed !== undefined && kycActive && (
                                                <>
                                                <hr/>

                                                <h5 className='pink-text' style={{ marginTop: 10, fontSize: 13 }}>KYC status (<span style={{ color: 'black' }}> { kyc_status === 'no kyc' && kyc_needed ? 'Waiting for KYC' : kyc_status } </span>)</h5>
                                                { !kyc_needed && (
                                                    <Button onClick={() => this.askForUserKYC()} variant="outlined" size="small" style={kycButtonStyle} disabled={loading}>
                                                        { loading ? "Sending..." : <><SearchIcon style={{marginRight: 3}}/>Ask for KYC</> }
                                                    </Button>
                                                )}
                                                </>
                                            )}
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
                                {this.renderDataTitle({title : 'Withdraws', data :  parseFloat(withdraws.length), loading: isLoading, decimals: 0})}
                            </Col>
                            <Col sd={12} md={4} lg={3}>
                                {this.renderDataTitle({title : 'Deposits', data :  parseFloat(deposits.length), loading: isLoading, decimals: 0})}
                            </Col>
                            <Col sd={12} md={4} lg={3}>
                                {this.renderDataTitle({title : 'Affiliate Wallet', data :  !_.isEmpty(affiliateWallet) ? parseFloat(affiliateWallet[0].playBalance).toFixed(6) : 0, span : currencyTicker, loading: isLoading, decimals: 6})}
                            </Col>
                            <Col sd={12} md={4} lg={3}>
                                {this.renderDataTitle({title : 'Affiliates', data : affiliate.affiliatedLinks.length, loading: isLoading, decimals: 0})}
                            </Col>
                            { this.hasAddOn('pointSystem') && (
                                <Col sd={12} md={4} lg={3}>
                                    { this.renderPointsData({ addon: this.getAddOnObj('pointSystem'), points: points, loading: isLoading }) } 
                                </Col>
                            )}
                        </Row>
                    </Col>
                </Row>
                <Card>
                    <CardBody className="dashboard__card-widget" style={{ borderRadius: "10px", border: "solid 1px rgba(164, 161, 161, 0.35)", backgroundColor: "#fafcff", boxShadow: "none", padding: 10 }}>
                        <HorizontalTabs
                            padding={true}
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
                                    label : 'Casino Bets',
                                    tab : <BetsTable user={user}/>
                                },
                                {
                                    label : 'Esports Bets',
                                    tab : hasEsports ? <EsportsBetsTable user={user}/> : <EsportsNotEnable> <img src={esports} alt="esports"/> <span>Esports is not currently enabled</span></EsportsNotEnable>
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
        </Fade>
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

