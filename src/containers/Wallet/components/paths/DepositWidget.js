import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { compose } from 'lodash/fp'
import CurrencyBox from './components/CurrencyBox';
import DepositsTable from './deposit/Table';
import _ from 'lodash';
import { getNonce } from '../../../../lib/number';

const defaultState = {
    ticker : 'N/A',
    deposits : []
}

class DepositWidget extends React.Component{

    constructor(props){
        super(props)
        this.state = defaultState;
    }

    componentDidMount(){
        this.projectData(this.props)
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }
    
    projectData = async (props) => {
        if(_.isEmpty(props.profile)){return null}
        const { wallet } = props;
        const { currency } = wallet;
        if(_.isEmpty(wallet)){return null}

        let deposits = props.profile.getApp().getDeposits({currency});
        let ticker = wallet.currency.ticker;

        this.setState({...this.state, 
            deposits,
            ticker 
        })
    }

    confirmDeposit = async (depositObject) => {
        const { currency } = this.props.wallet;

        var { transactionHash, amount } = depositObject;
        try{
            await this.props.profile.getApp().updateWallet({amount, transactionHash, currency_id : currency._id});
            await this.props.profile.getData();
            this.projectData(this.props);
        }catch(err){
            // TO DO : Raise Notification System
            throw err;
        }
      }

    disable = () => {
        this.setState({...this.state, disabled : true});
    }

    enable = () => {
        this.setState({...this.state, disabled : false});
    }


    render = () => {
        const { wallet, currency } = this.props;
        const { deposits, ticker } = this.state; 

        return (
            <Container className="dashboard">
                <Col lg={12}>
                    <h3 style={{marginTop : 20}} className={"bold-text dashboard__total-stat"}>Deposit</h3>
                    <p className="">
                        Choose the Amount of Liquidity you want to Deposit
                    </p>
                </Col>
                <Row>
                    <Col lg={5}>
                        <CurrencyBox data={wallet}/>
                    </Col>
                    <Col lg={7}>
                        <div style={{marginTop : 50}}>
                            <DepositsTable
                                disabled={this.state.disabled}
                                confirmDeposit={this.confirmDeposit} 
                                currency={ticker} data={deposits}
                            />
                        </div>
                    </Col>
                </Row>

             
            </Container>
        )
    }

}



function mapStateToProps(state){
    return {
        profile: state.profile,
        wallet : state.wallet
    };
}

DepositWidget.propTypes = {
    t: PropTypes.func.isRequired
};


export default compose(
    translate('common'),
    connect(mapStateToProps)
)(DepositWidget);

