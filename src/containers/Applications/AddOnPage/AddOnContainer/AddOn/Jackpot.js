/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import Skeleton from "@material-ui/lab/Skeleton";
import { connect } from "react-redux";
import { Grid, ExpansionPanelDetails, ExpansionPanelSummary, ExpansionPanel, Paper, Dialog, DialogContent, Button } from '@material-ui/core';
import TextInput from '../../../../../shared/components/TextInput';
import EditLock from '../../../../Shared/EditLock';
import { ExpandMoreIcon, MoneyIcon, MedalIcon } from 'mdi-react';
import Slider from "./components/Slider"
import UserBetsTable from './components/UserBetsTable';
import _ from "lodash";
import WinnersTable from './components/WinnersTable';
import { LockWrapper } from '../../../../../shared/components/LockWrapper';

class Jackpot extends React.Component {
 
    constructor() {
        super();
        this.state = {
            lock: true,
            loading: false,
            newEdge: 0,
            showWinnersDialog: false,
            showBetsDialog: false
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
        const { jackpot, currency } = props;
        const { name, description, image_url, bets, winResult, edge } = jackpot;

        const limits = jackpot.limits.find(l => l.currency === currency._id);

        this.setState({...this.state, 
            name,
            description,
            image_url,
            bets,
            winResult,
            limits,
            edge
        })
    }

    unlock = () => {
        this.setState({...this.state, lock: false })
    }

    lock = () => {
        this.setState({...this.state, lock: true })
    }

    onChangeEdge = (event) => {
        this.setState({...this.state, newEdge: event.value ? parseFloat(event.value) : 0})
    }

    toggleWinnersDialog = () => {
        this.setState({...this.state, showWinnersDialog: !this.state.showWinnersDialog})
    }

    toggleBetsDialog = () => {
        this.setState({...this.state, showBetsDialog: !this.state.showBetsDialog})
    }

    confirmChanges = async () => {
        const { profile } = this.props;
        const { newEdge } = this.state;

        this.setState({...this.state, loading: true })

        await profile.getApp().editJackpot({edge: newEdge})
        await profile.getApp().updateAppInfoAsync();
        await profile.update();

        this.setState({...this.state, loading: false })
        this.lock()

    }

    render() {
        const { currency, isLoading, profile } = this.props;
        const { name, description, image_url, bets, winResult, edge, limits, newEdge, lock, showWinnersDialog, showBetsDialog } = this.state;
        
        const isSuperAdmin = profile.User.permission.super_admin;

        if (!limits) return null

        return (
            <Col md={12} xl={12} lg={12} xs={12} style={{height: `100%`}}>
                {isLoading ? (
                <>
                <Card className='game-container'>
                    <CardBody className="dashboard__card-widget" style={{ width: 320 }}>
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
                            aria-controls="jackpot-content"
                            id="jackpot-header"
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
                                    confirmChanges={this.confirmChanges} 
                                    isLoading={this.state.loading}
                                    locked={lock}>
                                    <h5 className="">Pot</h5>
                                    <div style={{ display: "flex"}}>
                                        <h3 style={{marginTop: 20, marginRight: 0}} className={"dashboard__total-stat"}>{limits.pot.toFixed(6)}</h3>
                                        <h3 style={{ fontSize: 17, marginLeft: 0 }} className={"dashboard__total-stat"}>{currency.ticker}</h3>
                                    </div>
                                
                                    <Dialog open={showWinnersDialog} onClose={this.toggleWinnersDialog} fullWidth maxWidth="lg">
                                        <DialogContent>
                                            <WinnersTable winners={winResult} />
                                        </DialogContent>
                                    </Dialog>
                                    <Dialog open={showBetsDialog} onClose={this.toggleBetsDialog} fullWidth maxWidth="lg">
                                        <DialogContent>
                                            <UserBetsTable bets={bets} />
                                        </DialogContent>
                                    </Dialog>

                                    <Button size="small" variant="outlined" disabled={_.isEmpty(winResult)}
                                    style={{ textTransform: "none", backgroundColor: "#CFB53B", color: "#ffffff", boxShadow: "none", margin: 10, marginLeft: 0}} 
                                    onClick={this.toggleWinnersDialog}>
                                        <MedalIcon style={{marginRight: 7}}/> Winners
                                    </Button>

                                    <Button size="small" variant="outlined" disabled={_.isEmpty(bets)}
                                    style={{ textTransform: "none", backgroundColor: "#649B3A", color: "#ffffff", boxShadow: "none", margin: 10, marginLeft: 0}} 
                                    onClick={this.toggleBetsDialog}>
                                        <MoneyIcon style={{marginRight: 7}}/> Bets
                                    </Button>

                                    <hr/>

                                    <h5 className="">Bet % that goes into the jackpot pot</h5>
                                    <h3 style={{marginTop: 20}} className={"dashboard__total-stat"}>{edge}%</h3>
                                    <br/>
                                    <h6 className="">New %</h6>
                                    <h5 className={"dashboard__total-stat"}>{newEdge}%</h5>
                                    <Slider disabled={this.state.lock} value={newEdge} onChange={this.onChangeEdge}/>
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

export default connect(mapStateToProps)(Jackpot);

