import React from 'react';
import { connect } from "react-redux";
import { ButtonBase, Dialog, DialogContent } from '@material-ui/core';
import { Row, Col, Card, CardBody } from 'reactstrap';
import _ from 'lodash';
import AnimationNumber from '../../../containers/UI/Typography/components/AnimationNumber';
import Skeleton from '@material-ui/lab/Skeleton';
import { CloseIcon, TableIcon, JsonIcon } from 'mdi-react';
import { DialogHeader, CloseButton } from './styles';
import { CSVLink } from 'react-csv';
import { Button as MaterialButton } from "@material-ui/core";
import { export2JSON } from '../../../utils/export2JSON';

class UserContainer extends React.Component {
 
    constructor() {
        super();
        this.state = {
            open: false,
            user: {},
            isLoading: false
        };
    }

    componentDidMount(){
        this.projectData(this.props);
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }

    projectData = async (props) => {
        const { user, profile } = props;

        if (!_.isEmpty(this.state.user)) {

            const app = await profile.getApp();
            const userData = await this.getUserInfo({ user_id: user });

            if (!_.isEmpty(userData)) {
                this.setState({
                    user: userData,
                    ecosystemAddOns: app.params.storeAddOn,
                    appAddOns: app.params.addOn
                })
            } else {
                this.setState({
                    user: {}
                })
            }
        }
    }

    setOpen = async () => {
        const { user, profile } = this.props;

        if (_.isEmpty(this.state.user)) {

            
            const app = await profile.getApp();
            const userData = await this.getUserInfo({ user_id: user });

            this.setState({
                user: userData,
                open: true,
                ecosystemAddOns: app.params.storeAddOn,
                appAddOns: app.params.addOn
            })
        }
    }

    setClose = () => {

        this.setState({
            open: false,
            user: {}
        })
    }

    getUserInfo = async ({ user_id }) => {
        const { profile, currency } = this.props;

        this.setState({ isLoading: true });

        const user = await profile.getApp().getUserAsync({ user: user_id, currency: currency });
        const affiliateWallet = user.affiliate.wallet.filter(w => w.currency._id === currency._id);
        
        this.setState({ isLoading: false });

        return { ...user, affiliateWallet };
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

    renderPointsData = ({ addon, points, loading }) => {
        if ( _.isEmpty(addon)) return null;

        const { name } = addon;

        return (
            <Card>
                <CardBody className="dashboard__card-widget" style={{ borderRadius: "10px", border: "solid 1px rgba(164, 161, 161, 0.35)", backgroundColor: "#fafcff", boxShadow: "none" }}>
                    <p className='text-small pink-text'> Points </p>
                    {loading ? (
                        <Skeleton variant="rect" height={12} style={{ marginTop: 10, marginBottom: 10 }}/>
                    ) : (
                        <h4 className='secondary-text' style={{marginTop : 5}}> <AnimationNumber decimals={0} font={'11pt'} number={points}/> <span className='text-x-small'>{ name }</span></h4>
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

    render() {
        const { currency } = this.props;
        const { open, user, isLoading } = this.state;

        if (!user || !currency) return null;

        const { username, email, _id, winAmount, withdraws, deposits, affiliate, profit, address, betAmount, wallet, affiliateWallet, points } = user;
        const playBalance = wallet ? wallet.find(wallet => wallet.currency._id === currency._id).playBalance : undefined;
        
        let csvData = [{}];
        let jsonData = [];
        let  headers = []

        if (!_.isEmpty(user)) {
            const data = [
                { 
                    _id: _id,
                    username: username,
                    email: email,
                    currency: currency,
                    playBalance: playBalance ? parseFloat(playBalance).toFixed(6) : 0,
                    betAmount: betAmount ? parseFloat(betAmount).toFixed(6) : 0,
                    winAmount: winAmount ? parseFloat(winAmount).toFixed(6) : 0,
                    profit: profit ? parseFloat(profit).toFixed(6) : 0,
                    withdraws: parseFloat(withdraws.length),
                    deposits: parseFloat(deposits.length),
                    affiliateWallet: !_.isEmpty(affiliateWallet) ? parseFloat(affiliateWallet[0].playBalance).toFixed(6) : 0,
                    affiliates: affiliate.affiliatedLinks ? affiliate.affiliatedLinks.length : 0
                }
            ]
    
            headers = [
                { label: "Id", key: "_id" },
                { label: "Username", key: "username" },
                { label: "E-mail", key: "email" },
                { label: "Currency", key: "currency" },
                { label: "Balance", key: "playBalance" },
                { label: "Win Amount", key: "winAmount" },
                { label: "Bet Amount", key: "betAmount" },
                { label: "Profit", key: "profit" },
                { label: "Withdraws", key: "withdraws" },
                { label: "Deposits", key: "deposits" },
                { label: "Affiliate Wallet", key: "affiliateWallet" },
                { label: "Affiliates", key: "affiliates" },
            ];
    
            if (!_.isEmpty(data)) {
                csvData = data.map(row => ({...row, currency: row.currency.name}));
        
                jsonData = csvData.map(row => _.pick(row, ['_id', 'username', 'email', 'currency', 'playBalance', 'winAmount', 'betAmount', 'profit', 'withdraws', 'deposits', 'affiliateWallet', 'affiliates']));
            }
        }
        
        return(
            <>
            <ButtonBase onClick={this.setOpen}>
                {this.props.children} 
            </ButtonBase>
            { !_.isEmpty(user) ? 
                <Dialog
                // disableBackdropClick
                open={open}
                onClose={this.setClose}
                fullWidth maxWidth="lg"
                    >
                    <DialogHeader>
                    <div style={{ display: "flex", justifyContent: "flex-start", marginRight: 20 }}>
                        <CSVLink data={csvData} filename={"user.csv"} headers={headers}>
                            <MaterialButton variant="contained" size="small" style={{ textTransform: "none", backgroundColor: "#008000", color: "#ffffff", boxShadow: "none", margin: 10}}>
                                <TableIcon style={{marginRight: 7}}/> CSV
                            </MaterialButton>
                        </CSVLink>
                        <MaterialButton onClick={() => export2JSON(jsonData, "user")} variant="contained" size="small" style={{ textTransform: "none", boxShadow: "none", margin: 10}}>
                            <JsonIcon style={{marginRight: 7}}/> JSON
                        </MaterialButton>
                    </div>
                        <CloseButton onClick={this.setClose}>
                            <CloseIcon/>
                        </CloseButton>
                    </DialogHeader>
                    <DialogContent>
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
                                        {this.renderDataTitle({title : 'Balance', data : playBalance ? parseFloat(playBalance).toFixed(6) : 0, span : currency.ticker, loading: isLoading, decimals: 6})}
                                    </Col>
                                    <Col sd={12} md={4} lg={3}>
                                        {this.renderDataTitle({title : 'TurnOver', data :  betAmount ? parseFloat(betAmount).toFixed(6) : 0, span : currency.ticker, loading: isLoading, decimals: 6})}
                                    </Col>
                                    <Col sd={12} md={4} lg={3}>
                                        {this.renderDataTitle({title : 'Win Amount', data :  winAmount ? parseFloat(winAmount).toFixed(6) : 0, span : currency.ticker, loading: isLoading, decimals: 6})}
                                    </Col>
                                    <Col sd={12} md={4} lg={3}>
                                        {this.renderDataTitle({title : 'Profit', data :  profit ? parseFloat(profit).toFixed(6) : 0, span : currency.ticker, loading: isLoading, decimals: 6})}
                                    </Col>
                                    <Col sd={12} md={4} lg={3}>
                                        {this.renderDataTitle({title : 'Withdraws', data :  parseFloat(withdraws.length), decimals: 0})}
                                    </Col>
                                    <Col sd={12} md={4} lg={3}>
                                        {this.renderDataTitle({title : 'Deposits', data :  parseFloat(deposits.length), decimals: 0})}
                                    </Col>
                                    <Col sd={12} md={4} lg={3}>
                                        {this.renderDataTitle({title : 'Affiliate Wallet', data :  !_.isEmpty(affiliateWallet) ? parseFloat(affiliateWallet[0].playBalance).toFixed(6) : 0, span : currency.ticker, loading: isLoading, decimals: 6})}
                                    </Col>
                                    <Col sd={12} md={4} lg={3}>
                                        {this.renderDataTitle({title : 'Affiliates', data : affiliate.affiliatedLinks ? affiliate.affiliatedLinks.length : 0, loading: isLoading, decimals: 0})}
                                    </Col>
                                    { this.hasAddOn('pointSystem') && (
                                        <Col sd={12} md={4} lg={3}>
                                            { this.renderPointsData({ addon: this.getAddOnObj('pointSystem'), points: points, loading: isLoading }) } 
                                        </Col>
                                    )}
                                </Row>
                            </Col>
                        </Row>
                    </DialogContent>
                    {/* <DialogActions>
                    <button disabled={isLoading[withdraw._id]}className={`clean_button button-normal button-hover`} style={{ height: "35px", backgroundColor: "#63c965", margin: "25px", pointerEvents: isLoading[withdraw._id] ? 'none' : 'all' }} onClick={this.onSubmit}> 
                        { !isLoading[withdraw._id] ?
                        <p className='text-small text-white'>Yes, confirm withdraw</p>
                        : <p className='text-small text-white'>Confirming...</p> }
                    </button>
                    </DialogActions> */}
                </Dialog> : null }
            </>
        )
    }

}

function mapStateToProps(state){
    return {
        profile: state.profile,
        currency: state.currency
    };
}


export default connect(mapStateToProps)(UserContainer);