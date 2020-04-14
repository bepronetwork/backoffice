/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import Skeleton from "@material-ui/lab/Skeleton";
import { connect } from "react-redux";
import { Grid, Switch, Typography, ExpansionPanelDetails, ExpansionPanelSummary, ExpansionPanel, makeStyles } from '@material-ui/core';
import TextInput from '../../../../../shared/components/TextInput';
import EditLock from '../../../../Shared/EditLock';
import { BankIcon, ExpandMoreIcon } from 'mdi-react';

const defaultState = {
    name: 'AutoWithdraw',
    description: 'AutoWithdraw for your application',
    image_url: 'https://cdn1.iconfinder.com/data/icons/finance-banking-11/70/withdraw__ATM__cash__money__currency-512.png',
    isAutoWithdraw: false,
    maxWithdrawAmountCumulative: 0,
    maxWithdrawAmountPerTransaction: 0,
    lock: true,
    loading: false
}

class AutoWithdraw extends React.Component {
 
    constructor() {
        super();
        this.state = defaultState;
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

        const isAutoWithdraw = autoWithdraw.isAutoWithdraw;
        const maxWithdrawAmountCumulative = autoWithdraw.maxWithdrawAmountCumulative.filter(w => w.currency === currency._id)[0].amount;
        const maxWithdrawAmountPerTransaction = autoWithdraw.maxWithdrawAmountPerTransaction.filter(w => w.currency === currency._id)[0].amount;

        this.setState({...this.state, 
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
        const { currency, isLoading } = this.props;
        const { name, description, image_url, isAutoWithdraw, maxWithdrawAmountCumulative, maxWithdrawAmountPerTransaction, lock } = this.state;

        return (
            <Col md={12} xl={12} lg={12} xs={12} style={{height: `100%`}}>
                {isLoading ? (
                <>
                <Card className='game-container'>
                    <CardBody className="dashboard__card-widget" style={{ width: 420 }}>
                        <Grid container direction='row' spacing={1}>
                            <Grid item xs={9}>
                                <Skeleton variant="rect" height={29} style={{ marginTop: 10, marginBottom: 10 }}/>
                            </Grid>
                            <Grid item xs={3}>
                                <Skeleton variant="circle" width={50} height={50} style={{ marginBottom: 10, marginLeft: 'auto', marginRight: 0 }}/>
                            </Grid>           
                        </Grid>
                        <Skeleton variant="rect" height={35} style={{ marginTop: 10, marginBottom: 10 }}/>
                        <Skeleton variant="rect" height={35} style={{ marginBottom: 10 }}/>
                        <Skeleton variant="rect" height={350} style={{ marginBottom: 10 }}/>
                    </CardBody>
                </Card>
                </>   
                ) : (                  
                    <Card className='game-container'>
                        <CardBody className="dashboard__card-widget" style={{width: '420px'}}>
                            <ExpansionPanel elevation={0}>
                            <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="content"
                            id="header"
                            style={{padding: 0}}
                            >
                            <Row>
                                <Col lg={8} >
                                    <div className="dashboard__visitors-chart text-left">
                                        <p className="dashboard__visitors-chart-title text-left" style={{fontSize : 20}}>{name}</p>
                                    </div>
                                    <div className="dashboard__visitors-chart text-left" style={{marginTop : 10}}>
                                        {/* <p className="application__span" >Edge</p> */}
                                        <h5>{description}</h5>
                                    </div>
                                </Col>
                                <Col lg={4} >
                                    <img className='application__game__image' style={{width: `60px`, margin: '10px'}} src={image_url}/>
                                </Col>
                            </Row>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails style={{padding: 0}}>
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
                                <h5 className="">Max Withdraw amount cumulative ({maxWithdrawAmountCumulative} {currency.ticker})</h5>
                                <TextInput
                                    icon={BankIcon}
                                    name="maxWithdrawAmountCumulative"
                                    label="Max Withdraw amount cumulative"
                                    type="text"
                                    disabled={lock}
                                    changeContent={(type, value) => this.onChangeCumulative(value)}
                                />
                                <hr/>
                                <h5 className="">Max Withdraw amount per transaction ({maxWithdrawAmountPerTransaction} {currency.ticker})</h5>
                                <TextInput
                                    icon={BankIcon}
                                    name="maxWithdrawAmountPerTransaction"
                                    label="Max Withdraw amount per transaction"
                                    type="text"
                                    disabled={lock}
                                    changeContent={(type, value) => this.onChangePerTransaction(value)}
                                />
                            </EditLock>
                            </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </CardBody>
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

