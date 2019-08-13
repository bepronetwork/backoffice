import React from 'react';
import { Col, Container, Row, Card, CardBody, Button } from 'reactstrap';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { compose } from 'lodash/fp'
import _ from 'lodash';
import SettingsBox from './components/SettingsBox';
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
    isPaused : false,
    locks : {},
    currencyTicker : 'N/A',
    locks : {
        maxWithdrawal : true,
        maxDeposit : true,
        withdrawalTimeLimit : true
    },
    isLoading : {
        maxWithdrawal : false,
        isPaused : false,
        maxDeposit : false,
        withdrawalTimeLimit : false
    }
}

class SettingsContainer extends React.Component{

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
        let isPaused = await props.profile.getApp().isPaused(); 

        this.setState({...this.state, 
            currencyTicker,
            maxDeposit,
            maxWithdrawal,
            isPaused,
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

    pauseContract = async () => {
        var { profile } = this.props;
        this.setState({...this.state, isLoading : {...this.state.isLoading, isPaused : true}})
        await profile.getApp().pauseContract();
        this.setState({...this.state, isLoading : {...this.state.isLoading, isPaused : false}});
        this.projectData(this.props);
        return;
    }

    unpauseContract = async () => {
        var { profile } = this.props;
        this.setState({...this.state, isLoading : {...this.state.isLoading, isPaused : true}})
        await profile.getApp().unpauseContract();
        this.setState({...this.state, isLoading : {...this.state.isLoading, isPaused : false}});
        this.projectData(this.props);
        return;
    }

    render = () => {

        return (
            <Container className="dashboard">
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
                <p className="dashboard__visitors-chart-title text-left text-red" style={{fontSize : 18, marginBottom : 10}}> Risk Management </p>
                <hr></hr>
                <Row>
                    <Col md={4}>
                        <Card>
                             <CardBody>
                                <Row>
                                    <Col md={4}>
                                        <img className='application__game__image' src={emergency}/>
                                     
                                    </Col>
                                    <Col md={8}>
                                        <h3 style={{marginTop : 20}} className={"bold-text dashboard__total-stat"}>  {!this.state.isPaused ? 'Working' : 'Paused'}  </h3>
                                        <h5 className=""> Status </h5>
                                        <hr></hr>
                                        {!this.state.isPaused ?
                                                <Button disabled={this.state.isLoading.isPaused} onClick={() => this.pauseContract()} className="icon" outline>
                                                    <p><EmergencyExitIcon className="deposit-icon"/> {!this.state.isLoading.isPaused ? 'Pause Contract' : '...is Updating'}</p>
                                                </Button>
                                            :        
                                            <div>
                                                <Button disabled={this.state.isLoading.isPaused} onClick={() => this.unpauseContract()} className="icon" outline>
                                                    <p><OpenInAppIcon className="deposit-icon"/>  {!this.state.isLoading.isPaused ? 'Activate Contract' : '...is Updating'}</p>
                                                </Button>
                                            </div>        
                                        }
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
          </Container>
        )
    }

}



function mapStateToProps(state){
    return {
        profile: state.profile
    };
}

SettingsContainer.propTypes = {
    t: PropTypes.func.isRequired
};


export default compose(
    translate('common'),
    connect(mapStateToProps)
)(SettingsContainer);

