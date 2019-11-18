import React from 'react';
import { Col, Container, Row, Card, CardBody, Button } from 'reactstrap';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { compose } from 'lodash/fp'
import _ from 'lodash';
import SettingsBox from '../components/SettingsBox';
import { ArrowExpandDownIcon, EmergencyExitIcon, OpenInAppIcon } from 'mdi-react';
const deposit = `${process.env.PUBLIC_URL}/img/dashboard/deposit.png`;
const withdrawal = `${process.env.PUBLIC_URL}/img/dashboard/withdrawal.png`;
const time = `${process.env.PUBLIC_URL}/img/dashboard/stopwatch.png`;
const emergency = `${process.env.PUBLIC_URL}/img/dashboard/siren.png`;


const defaultState = {
    maxDeposit : 0,
    new_maxDeposit : 0,
    withdrawalTimeLimit : 0,
    new_withdrawalTimeLimit : 0,
    maxWithdrawal : 0,
    new_maxWithdrawal : 0,
    locks : {},
    currencyTicker : 'N/A',
    locks : {
        maxWithdrawal : true,
        maxDeposit : true,
        withdrawalTimeLimit : true
    },
    isLoading : {
        maxWithdrawal : false,
        maxDeposit : false,
        withdrawalTimeLimit : false
    }
}

class SettingsTransactionContainer extends React.Component{

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
        let currencyTicker = props.profile.getApp().getCurrencyTicker();
        let maxDeposit = await props.profile.getApp().getMaxDeposit();
        let maxWithdrawal = await props.profile.getApp().getMaxWithdrawal();
        let withdrawalTimeLimit = await props.profile.getApp().getWithdrawalTimeLimit();

        this.setState({...this.state, 
            currencyTicker,
            maxDeposit,
            maxWithdrawal,
            withdrawalTimeLimit
        })
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
        var { profile } = this.props;
        this.setState({...this.state, isLoading : {...this.state.isLoading, [field] : true}})
        switch(field){
            case 'maxDeposit' : {
                // Change Edge
                await profile.getApp().changeMaxDeposit({ amount : this.state[`new_${field}`]});
                break;
            };
            case 'maxWithdrawal' : {
                // Change Edge
                await profile.getApp().changeMaxWithdrawal({ amount : this.state[`new_${field}`]});
                break;
            };
            case 'withdrawalTimeLimit' : {
                // Change Edge
                await profile.getApp().changeWithdrawalTimeLimit({ amount : this.state[`new_${field}`]});
                break;
            };
        }
        this.setState({...this.state, isLoading : {...this.state.isLoading, [field] : false}})
        this.projectData(this.props);
        this.state.locks[field] = true; 
    }

    render = () => {

        return (
            <div>
                <p className="dashboard__visitors-chart-title text-left" style={{fontSize : 18, marginBottom : 10}}> Overall Settings </p>
                <hr></hr>
                <Row>
                    <Col lg={4}>
                        <SettingsBox
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
                    <Col lg={4}>
                        <SettingsBox
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
                    <Col lg={4}>
                        <SettingsBox
                           title={'Locked Withdrawal Time'}
                           inputIcon={ArrowExpandDownIcon}
                           image={time}
                           lock={this.state.locks.withdrawalTimeLimit}
                           type={'withdrawalTimeLimit'} 
                           inputType={'date'}
                           currencyTicker={'Hours - hh:mm'}
                           value={this.state.withdrawalTimeLimit}
                           isLoading={this.state.isLoading.withdrawalTimeLimit}
                           new_value={this.state.new_withdrawalTimeLimit} 
                           /* Functions */
                           unlockField={this.unlockField} 
                           lockField={this.lockField} 
                           onChange={this.onChange} 
                           confirmChanges={this.confirmChanges} 
                        />
                    </Col>
                </Row>
          </div>
        )
    }

}



function mapStateToProps(state){
    return {
        profile: state.profile
    };
}

SettingsTransactionContainer.propTypes = {
    t: PropTypes.func.isRequired
};


export default compose(
    translate('common'),
    connect(mapStateToProps)
)(SettingsTransactionContainer);

