import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Row, Col, Container, Card, CardBody } from 'reactstrap';
import _ from 'lodash';
import Numbers from '../../../services/numbers';
import HorizontalTabs from '../../HorizontalTabs';
import UserTransactionsTable from './components/UserTransactionsTable';
import AffiliateInfo from './components/AffiliateInfo';

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
        const { user, profile, currency } = props;
        if(!user || _.isEmpty(user)){return null}
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

    allowWithdraw = async (withdraw) => {
        const { profile } = this.props;

        /** Do Withdraw to User */
        await profile.getApp().approveWithdraw(withdraw);

        /** Update Info */
        await profile.getApp().getWithdrawsAsync({});
        await profile.update();
    }

    renderDataTitle = ({title, data, span}) => {
        return (
            <Card>
                <CardBody className="dashboard__card-widget">
                    <p className='text-small pink-text'> {title} </p>
                    <h4 className='secondary-text' style={{marginTop : 5}}> {data} <span className='text-x-small'>{span}</span></h4>
                </CardBody>
            </Card>
        )
    }

    render = () => {
        const { user, currencyTicker } = this.state;
        if(!user || _.isEmpty(user)){return null};

        const { currency } = this.props;
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
            bets,
            address,
            betAmount,
            register_timestamp
        } = user;

        const transactions = withdraws.map( w => {return {...w, isWithdraw : true}}).concat(deposits);

        return (
            <Container className="dashboard">
                <Row>
                    <Col md={4}>
                        <div className='user-page-top'>
                            <Card>
                                <CardBody className="dashboard__card-widget">
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
                                {this.renderDataTitle({title : 'Gaming Wallet', data : !_.isEmpty(playBalance) ? parseFloat(playBalance) : 0, span : currencyTicker})}
                            </Col>
                            <Col sd={12} md={4} lg={3}>
                                {this.renderDataTitle({title : 'TurnOver', data :  !_.isEmpty(betAmount) ? parseFloat(betAmount) : 0, span : currencyTicker})}
                            </Col>
                            <Col sd={12} md={4} lg={3}>
                                {this.renderDataTitle({title : 'Win Amount', data :  !_.isEmpty(winAmount) ? parseFloat(winAmount) : 0, span : currencyTicker})}
                            </Col>
                            <Col sd={12} md={4} lg={3}>
                                {this.renderDataTitle({title : 'Profit', data :  !_.isEmpty(profit) ? parseFloat(profit) : 0, span : currencyTicker})}
                            </Col>
                            <Col sd={12} md={4} lg={3}>
                                {this.renderDataTitle({title : 'Withdraws', data :  parseFloat(withdraws.length)})}
                            </Col>
                            <Col sd={12} md={4} lg={3}>
                                {this.renderDataTitle({title : 'Deposits', data :  parseFloat(deposits.length)})}
                            </Col>
                            <Col sd={12} md={4} lg={3}>
                                {this.renderDataTitle({title : 'Affiliate Wallet', data :  !_.isEmpty(affiliate.wallet.playBalance) ? parseFloat(affiliate.wallet.playBalance) : 0, span : currencyTicker})}
                            </Col>
                            <Col sd={12} md={4} lg={3}>
                                {this.renderDataTitle({title : 'Affiliates', data : affiliate.affiliatedLinks.length})}
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Card>
                    <CardBody className="dashboard__card-widget">
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
        currency : state.currency
    };
}

UserPage.propTypes = {
    t: PropTypes.func.isRequired
};


export default connect(mapStateToProps)(UserPage);

