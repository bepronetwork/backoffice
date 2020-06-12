import React from 'react';
import { connect } from "react-redux";
import { ButtonBase, Dialog, DialogContent } from '@material-ui/core';
import { Row, Col, Card, CardBody } from 'reactstrap';
import _ from 'lodash';
import AnimationNumber from '../../../containers/UI/Typography/components/AnimationNumber';
import Skeleton from '@material-ui/lab/Skeleton';
import { CloseIcon } from 'mdi-react';
import { DialogHeader, CloseButton } from './styles';

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
        const { user } = props;

        if (!_.isEmpty(this.state.user)) {

            const userData = await this.getUserInfo({ user_id: user });

            if (!_.isEmpty(userData)) {
                this.setState({
                    user: userData
                })
            } else {
                this.setState({
                    user: {}
                })
            }
        }
    }

    setOpen = async () => {
        const { user } = this.props;

        if (_.isEmpty(this.state.user)) {

            const userData = await this.getUserInfo({ user_id: user });

            this.setState({
                user: userData,
                open: true
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

        const user = await profile.getApp().getUserAsync({ user: user_id });
        const summary = await profile.getApp().getSummaryData('users');
        
        const userSummary = summary.data ? summary.data.find(user => user._id === user_id) : undefined;
        const affiliateWallet = user.affiliate.wallet.filter(w => w.currency._id === currency._id);
        
        this.setState({ isLoading: false });

        return userSummary ? {...user, ...userSummary, affiliateWallet } : { ...user, affiliateWallet };
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

    render() {
        const { currency } = this.props;
        const { open, user, isLoading } = this.state;

        if (!user || !currency) return null;

        const { username, email, _id, winAmount, withdraws, deposits, affiliate, profit, address, betAmount, wallet, affiliateWallet } = user;
        const playBalance = wallet ? wallet.find(wallet => wallet.currency._id === currency._id).playBalance : undefined;

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