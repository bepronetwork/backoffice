/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import EditLock from '../../../Shared/EditLock';
import TextInput from '../../../../shared/components/TextInput';
import BooleanInput from './components/utils/BooleanInput';

class DepositBonus extends PureComponent {
 
    constructor() {
        super();
        this.state = {
            maxDeposit: 0,
            minDeposit: 0,
            percentage: 0,
            newMaxDeposit: null,
            newMinDeposit: null,
            newPercentage: null,
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

    onChangeIsDepositBonus = () => {
        this.setState({...this.state, isDepositBonus: !this.state.isDepositBonus })
    }

    onChangeMaxDeposit = (value) => {
        this.setState({...this.state, newMaxDeposit: value ? parseFloat(value) : 0 })
    }

    onChangeMinDeposit = (value) => {
        this.setState({...this.state, newMinDeposit: value ? parseFloat(value) : 0 })
    }

    onChangePercentage = (value) => {
        this.setState({...this.state, newPercentage: value ? parseFloat(value) : 0 })
    }

    projectData = (props) => {
        const { profile, data } = props;

        const app = profile.App;

        const depositBonus = app.params.addOn.depositBonus;

        this.setState({
            currency: data._id,
            isDepositBonus: depositBonus.isDepositBonus,
            maxDeposit: depositBonus.max_deposit.find(deposit => deposit.currency === data._id).amount,
            minDeposit: depositBonus.min_deposit.find(deposit => deposit.currency === data._id).amount,
            percentage: depositBonus.percentage.find(deposit => deposit.currency === data._id).amount
        })

    }

    confirmChanges = async () => {
        const { profile } = this.props;
        const { currency, isDepositBonus, maxDeposit, minDeposit, percentage, newMaxDeposit, newMinDeposit, newPercentage } = this.state;

        this.setState({...this.state, loading: true })

        const depositBonusParams = {
            isDepositBonus: isDepositBonus,
            max_deposit: newMaxDeposit !== null ? newMaxDeposit : maxDeposit,
            min_deposit: newMinDeposit !== null ? newMinDeposit : minDeposit,
            percentage: newPercentage !== null ? newPercentage : percentage
        }
        
        await profile.getApp().editDepositBonus({ currency: currency, depositBonusParams })
        await profile.getApp().updateAppInfoAsync();
        await profile.update();

        this.setState({...this.state, loading: false })
        this.lock()

    }

    render() {
        const { data } = this.props;
        const { lock, maxDeposit, minDeposit, percentage, isDepositBonus } = this.state;

        if(!data){return null}
        
        return (
            <Col md={12} xl={12} lg={12} xs={12}>
                <CardBody className="dashboard__card-widget" style={{width: '450px', paddingBottom: 10, borderRadius: "10px", border: "solid 1px rgba(164, 161, 161, 0.35)", backgroundColor: "#f8f8f8", boxShadow: "none" }}>
                    <EditLock 
                        unlockField={this.unlock} 
                        lockField={this.lock} 
                        confirmChanges={this.confirmChanges} 
                        isLoading={this.state.loading}
                        locked={lock}>
                        <h4 style={{ margin: 0 }}>Deposit Bonus</h4>
                        <BooleanInput
                            checked={isDepositBonus === true}
                            onChange={this.onChangeIsDepositBonus}
                            color="primary"
                            name="isDepositBonus"
                            disabled={lock}
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                        <hr/>
                    <Row>
                        <Col lg={6}>
                            <h3 style={{ fontSize: 17, marginLeft: 0 }} className={"dashboard__total-stat"}>Min Deposit</h3>

                            <div style={{ display: "flex"}}>
                                    <h3 style={{marginTop: 20, marginRight: 0}} className={"dashboard__total-stat"}>{minDeposit.toFixed(6)}</h3>
                                    <h3 style={{ fontSize: 17, marginLeft: 0 }} className={"dashboard__total-stat"}>{data.ticker}</h3>
                            </div>
                                <TextInput
                                    name="minDeposit"
                                    label={<h6 style={{ fontSize: 11 }}>New Min Deposit</h6>}
                                    type="text"
                                    disabled={lock}
                                    changeContent={(type, value) => this.onChangeMinDeposit(value)}
                                />

                            <br/>

                            <h3 style={{ fontSize: 17, marginLeft: 0 }} className={"dashboard__total-stat"}>Max Deposit</h3>

                            <div style={{ display: "flex"}}>
                                    <h3 style={{marginTop: 20, marginRight: 0}} className={"dashboard__total-stat"}>{maxDeposit.toFixed(6)}</h3>
                                    <h3 style={{ fontSize: 17, marginLeft: 0 }} className={"dashboard__total-stat"}>{data.ticker}</h3>
                            </div>
                                <TextInput
                                    name="maxDeposit"
                                    label={<h6 style={{ fontSize: 11 }}>New Max Deposit</h6>}
                                    type="text"
                                    disabled={lock}
                                    changeContent={(type, value) => this.onChangeMaxDeposit(value)}
                                />
                        </Col>
                        
                        <Col lg={5}>
                        <h3 style={{ fontSize: 17, marginLeft: 0 }} className={"dashboard__total-stat"}>Percentage</h3>

                        <div style={{ display: "flex"}}>
                                <h3 style={{marginTop: 20, marginRight: 0}} className={"dashboard__total-stat"}>{`${percentage.toFixed(2)} % `}</h3>
                        </div>
                            <TextInput
                                name="percentage"
                                label={<h6 style={{ fontSize: 11 }}>New Percentage</h6>}
                                type="text"
                                disabled={lock}
                                changeContent={(type, value) => this.onChangePercentage(value)}
                            />

                        </Col>
                    </Row>
                    </EditLock>
                </CardBody>
            </Col>
        );
    }
}

export default DepositBonus;
