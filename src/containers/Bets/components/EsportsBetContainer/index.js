import React from 'react';
import { connect } from "react-redux";
import { ButtonBase, Dialog, DialogContent, Button } from '@material-ui/core';
import { Row, Col } from 'reactstrap';
import _ from 'lodash';
import { CloseIcon, TableIcon, JsonIcon } from 'mdi-react';
import { DialogHeader, CloseButton, Title, VideoGameIcon, MatchesContainer, Score, TeamOne, TeamTwo, Result, ResultValue, Draw, SerieInfo, DateInfo, Time, Date as DateSpan, WonResult } from './styles';
import moment from 'moment';
import { CSVLink } from 'react-csv';
import { Button as MaterialButton } from "@material-ui/core";
import { export2JSON } from '../../../../utils/export2JSON';

import { Carousel } from 'antd';

import { opponents } from './data';
import Avatar from 'react-avatar';

class EsportsBetContainer extends React.Component {
 
    constructor() {
        super();
        this.state = {
            open: false,
            bet: {},
            isLoading: false
        };
    }

    componentDidMount(){
        this.projectData(this.props);
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }

    projectData = async (props) => {
        const { bet } = props;

        if (!_.isEmpty(this.state.bet)) {

            if (!_.isEmpty(bet)) {
                this.setState({
                    bet: bet
                })
            } else {
                this.setState({
                    bet: {}
                })
            }
        }
    }

    setOpen = async () => {
        const { bet } = this.props;

        if (_.isEmpty(this.state.bet)) {

            if (!_.isEmpty(bet)) {
                this.setState({
                    bet: bet,
                    open: true
                })
            }
        }
    }

    setClose = () => {

        this.setState({
            open: false,
            bet: {}
        })
    }

    render() {
        const { open, bet } = this.state;
        const { _id, user, currency, videogame, isWon, betAmount, winAmount, creation_timestamp, serverSeed, clientSeed, serverHashedSeed } = bet;

        const [teamOne, teamTwo] = opponents;

        let csvData = [{}];
        let jsonData = [];
        let  headers = []

        if (!_.isEmpty(user)) {
            const data = [
                { 
                    _id: _id,
                    user: user.username,
                    currency: currency.name,
                    betAmount: betAmount ? parseFloat(betAmount).toFixed(6) : 0,
                    winAmount: winAmount ? parseFloat(winAmount).toFixed(6) : 0,
                    creation_timestamp: creation_timestamp,
                    serverSeed: serverSeed,
                    clientSeed: clientSeed,
                    serverHashedSeed: serverHashedSeed
                }
            ]
    
            headers = [
                { label: "Id", key: "_id" },
                { label: "User", key: "user" },
                { label: "Currency", key: "currency" },
                { label: "Bet Amount", key: "betAmount" },
                { label: "Win Amount", key: "winAmount" },
                { label: "Created At", key: "creation_timestamp" },
                { label: "Server Seed", key: "serverSeed" },
                { label: "Client Seed", key: "clientSeed" },
                { label: "Server Hashed Seed", key: "serverHashedSeed" }
            ];
    
            if (!_.isEmpty(data)) {
                csvData = data.map(row => ({...row, creation_timestamp: moment(row.creation_timestamp).format("lll")}));
        
                jsonData = csvData.map(row => _.pick(row, ['_id', 'user', 'currency', 'betAmount', 'winAmount', 'creation_timestamp', 'serverSeed', 'clientSeed', 'serverHashedSeed']));
            }
        }

        return(
            <>
            <ButtonBase onClick={this.setOpen}>
                {this.props.children} 
            </ButtonBase>
            { !_.isEmpty(bet) ? 
                <Dialog
                // disableBackdropClick
                open={open}
                onClose={this.setClose}
                    >
                    <DialogHeader style={{ paddingBottom: 0 }}>
                    <div style={{ display: "flex", justifyContent: "flex-start", marginRight: 20 }}>
                        <CSVLink data={csvData} filename={"bet.csv"} headers={headers}>
                            <MaterialButton variant="contained" size="small" style={{ textTransform: "none", backgroundColor: "#008000", color: "#ffffff", boxShadow: "none", margin: 10}}>
                                <TableIcon style={{marginRight: 7}}/> CSV
                            </MaterialButton>
                        </CSVLink>
                        <MaterialButton onClick={() => export2JSON(jsonData, "bet")} variant="contained" size="small" style={{ textTransform: "none", boxShadow: "none", margin: 10}}>
                            <JsonIcon style={{marginRight: 7}}/> JSON
                        </MaterialButton>
                    </div>
                        <CloseButton onClick={this.setClose}>
                            <CloseIcon/>
                        </CloseButton>
                    </DialogHeader>
                    <DialogContent style={{ paddingTop: 0, maxWidth: 450 }}>
                        <Row>
                            <Col sd={12} md={12} lg={12} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                                    <VideoGameIcon>
                                        { videogame.icon }
                                    </VideoGameIcon>
                                    <h5>{videogame.name}</h5>
                                    <hr/>
                                </div>
                            </Col>
                            <Col sd={12} md={12} lg={12} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <h5 style={{marginTop : 5}}> {user.username} 
                                </h5>
                                <p className='text-small'> {creation_timestamp} </p>
                                <hr/>
                            </Col>
                        </Row>
                            <MatchesContainer>
                            <SerieInfo>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    {/* <VideoGameIcon>
                                        { videogame.icon }
                                    </VideoGameIcon> */}
                                    <span style={{ padding: 0 }}>LPL SUMMER 2020 - REGULAR SEASON</span>
                                </div>
                                <div>
                                    <DateInfo style={{ flexDirection: "row" }}>
                                        <Time style={{ margin: 5, padding: 0 }}>
                                            { '10:00' }
                                        </Time>
                                        <DateSpan style={{ margin: 5, padding: 0 }}>
                                            { '07/15' }
                                        </DateSpan>
                                    </DateInfo> 
                                </div>
                            </SerieInfo>
                            <Score> 
                                <TeamOne>
                                    <span>{teamOne.name}</span>
                                    { teamOne.image_url ? <img src={teamOne.image_url} alt={teamOne.name}/> : <Avatar name={teamOne.name} size="35" round={true}/> } 
                                </TeamOne>
                                    <Result>
                                        <ResultValue>
                                            { 2 }
                                        </ResultValue>
                                        <span>vs</span> 
                                        <ResultValue>
                                            { 1 }
                                        </ResultValue>
                                    </Result>
                                <TeamTwo>
                                    { teamTwo.image_url ? <img src={teamTwo.image_url} alt={teamTwo.name}/> : <Avatar name={teamTwo.name} size="35" round={true}/> } 
                                    <span>{teamTwo.name}</span>
                                </TeamTwo>
                            </Score>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                                    <WonResult isWon={isWon}>{isWon ? 'Won' : 'Loss'}</WonResult>
                            </div>
                            </MatchesContainer>
                        <Row style={{ marginTop: 15 }}>
                            <Col sd={12} md={12} lg={6} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <h5 style={{margin: 5}}>Bet Amount</h5>
                                <div style={{display: 'flex'}}>
                                    <h5 style={{margin: 5}}>{betAmount.toFixed(6)}</h5>
                                    <img src={currency.image} style={{ width : 25, height : 25}} alt={currency.name}/>
                                </div>
                            </Col>
                            <Col sd={12} md={12} lg={6} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <h5 style={{margin: 5}}>Win Amount</h5>
                                <div style={{display: 'flex'}}>
                                    <h5 style={{margin: 5}}>{winAmount.toFixed(6)}</h5>
                                    <img src={currency.image} style={{ width : 25, height : 25}} alt={currency.name}/>
                                </div>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 20 }}>
                            <Col sd={12} md={12} lg={6} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <h5 style={{margin: 5}}>Server Seed</h5>
                                <p className='text-small'> {serverSeed} </p>
                            </Col>
                            <Col sd={12} md={12} lg={6} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <h5 style={{margin: 5}}>Client Seed</h5>
                                <p className='text-small'> {clientSeed} </p>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 20, paddingBottom: 30 }}>
                            <Col sd={12} md={12} lg={12} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <h5 style={{margin: 5}}>Server Hashed Seed</h5>
                                <div style={{ width: "99%", marginTop: 10 }}>
                                    <p className='text-small' style={{ padding: "0px 20px", overflowWrap: "break-word" }}> {serverHashedSeed} </p>
                                </div>
                            </Col>
                        </Row>
                    </DialogContent>
                </Dialog> : null }
            </>
        )
    }

}

function mapStateToProps(state){
    return {
        profile: state.profile
    };
}


export default connect(mapStateToProps)(EsportsBetContainer);