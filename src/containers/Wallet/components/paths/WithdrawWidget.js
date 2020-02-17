import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { compose } from 'lodash/fp'
import WithdrawBox from './components/WithdrawBox';
import Numbers from '../../../../services/numbers';
import WithdrawsTable from './withdraw/Table';
import _ from 'lodash';

class WithdrawWidget extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            disabled : false,
            withdraws : [],
            ticker : 'N/A'
        }
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

        let withdraws = props.profile.getApp().getWithdraws({currency});
        let ticker = wallet.currency.ticker;

        this.setState({...this.state, 
            withdraws,
            ticker 
        })
    }

    withdrawTokens = async (withdrawObject) => {
        var { id } = withdrawObject;
        const { wallet } = this.props;
        const { currency } = wallet;

        try{
            this.setState({...this.state, disabled : true});
            /* Create Withdraw */
            await this.props.profile.finalizeWithdraw({withdraw_id : id, currency});
            await this.props.profile.getApp().updateAppInfoAsync();
            await this.props.profile.update();
            /* Update User Balance */
            this.setState({...this.state, disabled : false});
        }catch(err){
            console.log(err)
            alert(err);
            this.setState({...this.state, disabled : true});
        }
    }

    disable = () => {
        this.setState({...this.state, disabled : true});
    }

    enable = () => {
        this.setState({...this.state, disabled : false});
    }

    render = () => {
        const { ticker, withdraws } = this.state;

        return (
            <Container className="dashboard">
                <Col lg={12}>
                    <h3 style={{marginTop : 20}} className={"bold-text dashboard__total-stat"}>Withdraw</h3>
                    <p className="">
                        Choose the amount of Liquidity you want to withdraw
                    </p>
                </Col>
                <Row>
                    <Col lg={4}>
                        <WithdrawBox 
                        enable={this.enable} disable={this.disable}
                        disabled={this.state.disabled} data={this.props.profile.getApp().getSummaryData('wallet')}/>
                    </Col>
                    <Col lg={8}>
                        <div style={{marginTop : 50}}>
                            <WithdrawsTable
                                profile={this.props.profile}
                                disabled={this.state.disabled}
                                withdraw={this.withdrawTokens} 
                                currency={ticker} data={withdraws}
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

WithdrawWidget.propTypes = {
    t: PropTypes.func.isRequired
};


export default compose(
    translate('common'),
    connect(mapStateToProps)
)(WithdrawWidget);

