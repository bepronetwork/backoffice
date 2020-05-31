/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import Skeleton from "@material-ui/lab/Skeleton";
import { connect } from "react-redux";
import { Grid, Switch, Typography, ExpansionPanelDetails, ExpansionPanelSummary, ExpansionPanel, makeStyles, Paper } from '@material-ui/core';
import TextInput from '../../../../../shared/components/TextInput';
import EditLock from '../../../../Shared/EditLock';
import { BankIcon, ExpandMoreIcon } from 'mdi-react';
import { LockWrapper } from '../../../../../shared/components/LockWrapper';

class AutoWithdraw extends React.Component {
 
    constructor() {
        super();
        this.state = {
            lock: true,
            loading: false
        }
    }

    componentDidMount(){
        this.projectData(this.props);
    }

    componentWillReceiveProps(props){
        if (this.state.lock) {
            this.projectData(props);
        }
    }

    projectData = (props) => {
        const { autoWithdraw, currency } = props;
        const { name, description, image_url, isAutoWithdraw } = autoWithdraw;

        const maxWithdrawAmountCumulative = autoWithdraw.maxWithdrawAmountCumulative.filter(w => w.currency === currency._id)[0].amount;
        const maxWithdrawAmountPerTransaction = autoWithdraw.maxWithdrawAmountPerTransaction.filter(w => w.currency === currency._id)[0].amount;

        this.setState({...this.state, 
            name,
            description,
            image_url,
            isAutoWithdraw,
            maxWithdrawAmountCumulative,
            maxWithdrawAmountPerTransaction
        })
    }

    unlock = () => {
        this.setState({...this.state, lock: false })
    }

    lock = () => {
        this.setState({...this.state, lock: true })
    }

    handleChange = () => {
        this.setState({...this.state, isAutoWithdraw: !this.state.isAutoWithdraw })
    }

    onChangeCumulative = (value) => {
        this.setState({...this.state, maxWithdrawAmountCumulative: value ? parseFloat(value) : 0})
    }

    onChangePerTransaction = (value) => {
        this.setState({...this.state, maxWithdrawAmountPerTransaction: value ? parseFloat(value) : 0})
    }

    confirmChanges = async (currency) => {
        const { profile } = this.props;
        const currencyId = currency._id;

        const autoWithdrawParams = {
            isAutoWithdraw: this.state.isAutoWithdraw,
            maxWithdrawAmountCumulative: this.state.maxWithdrawAmountCumulative,
            maxWithdrawAmountPerTransaction: this.state.maxWithdrawAmountPerTransaction
        }

        this.setState({...this.state, loading: true })

        await profile.getApp().editAutoWithdraw({currency: currencyId, autoWithdrawParams})
        await profile.getApp().updateAppInfoAsync();
        await profile.update();
        this.setState({...this.state, loading: false })
        this.lock()

    }

    render() {
        const { name, description, image_url, isAutoWithdraw, maxWithdrawAmountCumulative, maxWithdrawAmountPerTransaction, lock } = this.state;
        const { currency, isLoading, profile } = this.props;

        const isSuperAdmin = profile.User.permission.super_admin;

        return (
            <Col style={{height: `100%`}}>
                {isLoading ? (
                <>
                <Card className='game-container'>
                    <CardBody className="dashboard__card-widget" style={{ width: 320}}>
                        <Grid container direction='row' spacing={1}>
                            <Grid item xs={9}>
                                <Skeleton variant="rect" height={29} style={{ marginTop: 10, marginBottom: 10 }}/>
                            </Grid>
                            <Grid item xs={3}>
                                <Skeleton variant="circle" width={50} height={50} style={{ marginBottom: 10, marginLeft: 'auto', marginRight: 0 }}/>
                            </Grid>           
                        </Grid>
                        <Skeleton variant="rect" height={35} style={{ marginTop: 10, marginBottom: 10 }}/>
                    </CardBody>
                </Card>
                </>   
                ) : (                  
                    <Card className='game-container'>
                        <Paper elevation={0} style={{width: '320px', padding: 5, boxShadow: "0 10px 30px 1px rgba(0, 0, 0, 0.06)"}}>
                            <ExpansionPanel elevation={0}>
                            <ExpansionPanelSummary
                            style={{width: '320px', height: '120px', padding: 20, paddingBottom: 0, paddingTop: 0, justifyContent: 'space-between'}}
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="autowithdraw-content"
                            id="autowithdraw-header"
                            >
                            <div style={{display: 'flex', justifyContent: 'space-between', width: "100%"}}>
                                    <div className="dashboard__visitors-chart text-left">
                                        <p className="dashboard__visitors-chart-title text-left" style={{fontSize : 20}}>{name}</p>
                                    </div>
                                    <img className='application__game__image' style={{width: '60px', margin: 0, padding: 0}} src={image_url}/>
                            </div>
                            </ExpansionPanelSummary>
                            <LockWrapper hasPermission={isSuperAdmin}>
                            <ExpansionPanelDetails style={{padding: 0}}>
                            <Col>
                                <div className="dashboard__visitors-chart text-left" style={{marginTop : 10}}>
                                    <h5>{description}</h5>
                                </div>

                            <hr/>
                            <EditLock 
                                unlockField={this.unlock} 
                                lockField={this.lock} 
                                confirmChanges={() => this.confirmChanges(currency)} 
                                isLoading={this.state.loading}
                                locked={lock}>
                                <h5 style={{ margin: 0 }} >AutoWithdraw</h5>
                                <Switch
                                    checked={isAutoWithdraw}
                                    onChange={this.handleChange}
                                    color="primary"
                                    name="isAutoWithdraw"
                                    disabled={lock}
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                />
                                <hr/>
                                <h5 className="">Max Withdraw Amount Cumulative Per User ({maxWithdrawAmountCumulative} {currency.ticker})</h5>
                                <TextInput
                                    // icon={BankIcon}
                                    name="maxWithdrawAmountCumulative"
                                    label={<h6>Max Withdraw Amount Cumulative Per User</h6>}
                                    type="text"
                                    disabled={lock}
                                    changeContent={(type, value) => this.onChangeCumulative(value)}
                                />
                                <hr/>
                                <h5 className="">Max Withdraw Amount Per Transaction ({maxWithdrawAmountPerTransaction} {currency.ticker})</h5>
                                <TextInput
                                    // icon={BankIcon}
                                    name="maxWithdrawAmountPerTransaction"
                                    label={<h6>Max Withdraw Amount Per Transaction</h6>}
                                    type="text"
                                    disabled={lock}
                                    changeContent={(type, value) => this.onChangePerTransaction(value)}
                                />
                            </EditLock>
                            </Col>
                            </ExpansionPanelDetails>

                            </LockWrapper>
                            
                            </ExpansionPanel>
                        </Paper>
                    </Card> )}
            </Col>
        );
    }
}

function mapStateToProps(state){
    return {
        profile: state.profile,
        currency : state.currency
    };
}

export default connect(mapStateToProps)(AutoWithdraw);

