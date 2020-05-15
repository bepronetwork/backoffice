/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import EditLock from '../../../Shared/EditLock';
import TextInput from '../../../../shared/components/TextInput';
import { Switch, withStyles } from '@material-ui/core';
import { purple } from '@material-ui/core/colors';
const deposit = `${process.env.PUBLIC_URL}/img/dashboard/deposit.png`;
const withdrawal = `${process.env.PUBLIC_URL}/img/dashboard/withdrawal.png`;

const PurpleSwitch = withStyles({
    switchBase: {
      color: purple[300],
      '&$checked': {
        color: purple[500],
      },
      '&$checked + $track': {
        backgroundColor: purple[500],
      },
    },
    checked: {},
    track: {},
  })(Switch);

class CurrencyInfo extends PureComponent {
 
    constructor() {
        super();
        this.state = {
            depositFee: 0,
            withdrawFee: 0,
            newDepositFee: null,
            newWithdrawFee: null,
            lock: true
        };
    }

    componentDidMount(){
        this.projectData(this.props);
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }

    unlock = () => {
        this.setState({...this.state, lock: false })
    }

    lock = () => {
        this.setState({...this.state, lock: true })
    }

    onChangeIsTxFee = () => {
        this.setState({...this.state, isTxFee: !this.state.isTxFee })
    }

    onChangeDepositFee = (value) => {
        this.setState({...this.state, newDepositFee: value ? parseFloat(value) : 0 })
    }

    onChangeWithdrawFee = (value) => {
        this.setState({...this.state, newWithdrawFee: value ? parseFloat(value) : 0 })
    }

    projectData = (props) => {
        const { profile, data } = props;

        const app = profile.App;

        const txFee = app.params.addOn.txFee;

        this.setState({
            currency: data._id,
            isTxFee: txFee.isTxFee,
            depositFee: txFee.deposit_fee.find(fee => fee.currency === data._id).amount,
            withdrawFee: txFee.withdraw_fee.find(fee => fee.currency === data._id).amount
        })

    }

    confirmChanges = async () => {
        const { profile } = this.props;
        const { currency, isTxFee, depositFee, newDepositFee, withdrawFee, newWithdrawFee } = this.state;

        this.setState({...this.state, loading: true })

        const txFeeParams = {
            isTxFee: isTxFee,
            deposit_fee: newDepositFee !== null ? newDepositFee : depositFee,
            withdraw_fee: newWithdrawFee !== null ? newWithdrawFee : withdrawFee
        }
        
        await profile.getApp().editTxFee({ currency: currency, txFeeParams })
        await profile.getApp().updateAppInfoAsync();
        await profile.update();

        this.setState({...this.state, loading: false })
        this.lock()

    }

    render() {
        const { data } = this.props;
        const { lock, depositFee, withdrawFee, isTxFee } = this.state;

        if(!data){return null}
        
        return (
            <Col md={12} xl={12} lg={12} xs={12}>
                <Card className='game-container'>
                    <CardBody className="dashboard__card-widget dashboard_borderTop" style={{width: '307px', paddingBottom: 10}}>
                            <EditLock 
                                unlockField={this.unlock} 
                                lockField={this.lock} 
                                confirmChanges={this.confirmChanges} 
                                isLoading={this.state.loading}
                                locked={lock}>
                            <h4 style={{ margin: 0 }} >Tx Fee</h4>
                                <PurpleSwitch
                                    checked={isTxFee}
                                    onChange={this.onChangeIsTxFee}
                                    color="primary"
                                    name="isTxFee"
                                    disabled={lock}
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                />
                                <hr/>
                        <Row>
                            <Col lg={4} >  
                                <img className='application__game__image' 
                                style={{display: 'block', width: '60px'}} 
                                src={deposit}/>
                            </Col>
                            <Col lg={8} >
                            <h3 style={{ fontSize: 17, marginLeft: 0 }} className={"dashboard__total-stat"}>Deposit Fee</h3>

                            <div style={{ display: "flex"}}>
                                    <h3 style={{marginTop: 20, marginRight: 0}} className={"dashboard__total-stat"}>{depositFee.toFixed(6)}</h3>
                                    <h3 style={{ fontSize: 17, marginLeft: 0 }} className={"dashboard__total-stat"}>{data.ticker}</h3>
                            </div>
                                <TextInput
                                    name="depositFee"
                                    label={<h6 style={{ fontSize: 11 }}>New Deposit Fee</h6>}
                                    type="text"
                                    disabled={lock}
                                    changeContent={(type, value) => this.onChangeDepositFee(value)}
                                />

                            </Col>
                            <Col lg={4} style={{ marginTop: 20 }}>  
                                <img className='application__game__image' 
                                style={{display: 'block', width: '60px'}} 
                                src={withdrawal}/>
                            </Col>
                            <Col lg={8} style={{ marginTop: 20 }}>
                            <h3 style={{ fontSize: 17, marginLeft: 0 }} className={"dashboard__total-stat"}>Withdraw Fee</h3>

                            <div style={{ display: "flex"}}>
                                    <h3 style={{marginTop: 20, marginRight: 0}} className={"dashboard__total-stat"}>{withdrawFee.toFixed(6)}</h3>
                                    <h3 style={{ fontSize: 17, marginLeft: 0 }} className={"dashboard__total-stat"}>{data.ticker}</h3>
                            </div>
                                <TextInput
                                    name="withdrawFee"
                                    label={<h6 style={{ fontSize: 11 }}>New Withdraw Fee</h6>}
                                    type="text"
                                    disabled={lock}
                                    changeContent={(type, value) => this.onChangeWithdrawFee(value)}
                                />

                            </Col>
                            
                        </Row>
                        </EditLock>
                    </CardBody>
                </Card>
            </Col>
        );
    }
}

export default CurrencyInfo;
